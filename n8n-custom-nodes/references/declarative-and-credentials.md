# Declarative Node, Credentials & Triggers

## Declarative Node (HTTP-Based)

For simple REST APIs, use the declarative style — no `execute()` method needed. n8n handles the request/response mapping from the `routing` config on each option.

```typescript
import { INodeType, INodeTypeDescription, NodeConnectionType } from 'n8n-workflow';

export class MyApiNode implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'My API',
    name: 'myApi',
    icon: 'file:myapi.svg',
    group: ['transform'],
    version: 1,
    subtitle: '={{$parameter["operation"]}}',
    description: 'Interact with My API',
    defaults: { name: 'My API' },
    inputs: [NodeConnectionType.Main],
    outputs: [NodeConnectionType.Main],
    credentials: [{ name: 'myApi', required: true }],
    requestDefaults: {
      baseURL: '={{ $credentials.baseUrl }}',
      headers: { Accept: 'application/json' },
    },
    properties: [
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        options: [
          {
            name: 'Get User',
            value: 'getUser',
            action: 'Get a user',
            routing: {
              request: {
                method: 'GET',
                url: '=/api/users/{{ $parameter.userId }}',
              },
            },
          },
          {
            name: 'Create User',
            value: 'createUser',
            action: 'Create a user',
            routing: {
              request: {
                method: 'POST',
                url: '/api/users',
              },
              send: {
                type: 'body',
                properties: {
                  name: '={{ $parameter.name }}',
                  email: '={{ $parameter.email }}',
                },
              },
            },
          },
        ],
        default: 'getUser',
      },
      {
        displayName: 'User ID',
        name: 'userId',
        type: 'string',
        default: '',
        required: true,
        displayOptions: { show: { operation: ['getUser'] } },
      },
      {
        displayName: 'Name',
        name: 'name',
        type: 'string',
        default: '',
        required: true,
        displayOptions: { show: { operation: ['createUser'] } },
      },
      {
        displayName: 'Email',
        name: 'email',
        type: 'string',
        default: '',
        required: true,
        displayOptions: { show: { operation: ['createUser'] } },
      },
    ],
  };
}
```

**When to reach for declarative instead of programmatic:** the target API is plain REST/JSON, the logic is "map these parameters to this request," and there's no need for custom pagination logic, non-HTTP protocols, or per-item conditional branching beyond `displayOptions`. If you find yourself wanting an `if` statement to decide what to do with a response, that's a sign you need the programmatic style instead.

## Credential Definition

```typescript
import {
  IAuthenticateGeneric,
  ICredentialTestRequest,
  ICredentialType,
  INodeProperties,
} from 'n8n-workflow';

export class MyApi implements ICredentialType {
  name = 'myApi';
  displayName = 'My API';
  documentationUrl = 'https://docs.example.com/api';

  properties: INodeProperties[] = [
    {
      displayName: 'Base URL',
      name: 'baseUrl',
      type: 'string',
      default: 'https://api.example.com',
      required: true,
    },
    {
      displayName: 'API Key',
      name: 'apiKey',
      type: 'string',
      typeOptions: { password: true },
      default: '',
      required: true,
    },
  ];

  authenticate: IAuthenticateGeneric = {
    type: 'generic',
    properties: {
      headers: {
        Authorization: '=Bearer {{ $credentials.apiKey }}',
      },
    },
  };

  test: ICredentialTestRequest = {
    request: {
      baseURL: '={{ $credentials.baseUrl }}',
      url: '/api/me',
    },
  };
}
```

The `test` block is what powers the "Test" button in n8n's credential UI — always include one so users get immediate feedback on whether their credentials are valid, rather than discovering it mid-workflow.

## Trigger Node

```typescript
import {
  ITriggerFunctions,
  INodeType,
  INodeTypeDescription,
  ITriggerResponse,
  NodeConnectionType,
} from 'n8n-workflow';

export class MyTrigger implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'My Trigger',
    name: 'myTrigger',
    icon: 'file:mytrigger.svg',
    group: ['trigger'],
    version: 1,
    description: 'Triggers on events from My Service',
    defaults: { name: 'My Trigger' },
    inputs: [],
    outputs: [NodeConnectionType.Main],
    credentials: [{ name: 'myApi', required: true }],
    polling: true,                          // for polling triggers
    properties: [
      {
        displayName: 'Event',
        name: 'event',
        type: 'options',
        options: [
          { name: 'Record Created', value: 'created' },
          { name: 'Record Updated', value: 'updated' },
        ],
        default: 'created',
      },
    ],
  };

  async poll(this: ITriggerFunctions): Promise<ITriggerResponse | null> {
    const credentials = await this.getCredentials('myApi');
    const event = this.getNodeParameter('event') as string;
    const webhookData = this.getWorkflowStaticData('node');
    const lastTimestamp = webhookData.lastTimestamp as string || new Date(0).toISOString();

    const response = await this.helpers.httpRequestWithAuthentication.call(
      this,
      'myApi',
      {
        method: 'GET',
        url: `${credentials.baseUrl}/api/events`,
        qs: { type: event, since: lastTimestamp },
        json: true,
      },
    );

    const events = Array.isArray(response) ? response : response.data || [];

    if (events.length === 0) return null;

    webhookData.lastTimestamp = events[events.length - 1].timestamp;

    return {
      workflowData: [this.helpers.returnJsonArray(events)],
    };
  }
}
```

`this.getWorkflowStaticData('node')` is the key mechanic here — it's how a polling trigger remembers its last-seen timestamp/cursor between poll cycles without an external database. Always persist the cursor there and return `null` (not an empty array) when there's nothing new, so n8n knows not to fire the workflow.
