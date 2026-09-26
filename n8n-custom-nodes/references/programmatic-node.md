# Programmatic Node

For complex logic, non-HTTP protocols, or custom processing that a declarative node's routing config can't express.

## Basic Structure
```typescript
import {
  IExecuteFunctions,
  INodeExecutionData,
  INodeType,
  INodeTypeDescription,
  NodeConnectionType,
} from 'n8n-workflow';

export class MyNode implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'My Node',
    name: 'myNode',
    icon: 'file:mynode.svg',
    group: ['transform'],
    version: 1,
    subtitle: '={{$parameter["operation"]}}',
    description: 'Description of what this node does',
    defaults: { name: 'My Node' },
    inputs: [NodeConnectionType.Main],
    outputs: [NodeConnectionType.Main],
    credentials: [
      {
        name: 'myApi',
        required: true,
      },
    ],
    properties: [
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        options: [
          { name: 'Create', value: 'create', description: 'Create a record' },
          { name: 'Get', value: 'get', description: 'Get a record' },
          { name: 'Get Many', value: 'getMany', description: 'Get many records' },
          { name: 'Update', value: 'update', description: 'Update a record' },
          { name: 'Delete', value: 'delete', description: 'Delete a record' },
        ],
        default: 'create',
      },
      {
        displayName: 'Name',
        name: 'name',
        type: 'string',
        default: '',
        required: true,
        displayOptions: {
          show: { operation: ['create', 'update'] },
        },
        description: 'The name of the record',
      },
      {
        displayName: 'ID',
        name: 'id',
        type: 'string',
        default: '',
        required: true,
        displayOptions: {
          show: { operation: ['get', 'update', 'delete'] },
        },
      },
      {
        displayName: 'Additional Fields',
        name: 'additionalFields',
        type: 'collection',
        placeholder: 'Add Field',
        default: {},
        displayOptions: {
          show: { operation: ['create', 'update'] },
        },
        options: [
          { displayName: 'Description', name: 'description', type: 'string', default: '' },
          { displayName: 'Tags', name: 'tags', type: 'string', default: '' },
        ],
      },
      {
        displayName: 'Limit',
        name: 'limit',
        type: 'number',
        default: 50,
        typeOptions: { minValue: 1, maxValue: 100 },
        displayOptions: {
          show: { operation: ['getMany'] },
        },
      },
    ],
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const items = this.getInputData();
    const returnData: INodeExecutionData[] = [];
    const operation = this.getNodeParameter('operation', 0) as string;
    const credentials = await this.getCredentials('myApi');

    for (let i = 0; i < items.length; i++) {
      try {
        if (operation === 'create') {
          const name = this.getNodeParameter('name', i) as string;
          const additionalFields = this.getNodeParameter('additionalFields', i) as Record<string, unknown>;

          const body: Record<string, unknown> = { name, ...additionalFields };

          const response = await this.helpers.httpRequestWithAuthentication.call(
            this,
            'myApi',
            {
              method: 'POST',
              url: `${credentials.baseUrl}/api/records`,
              body,
              json: true,
            },
          );

          returnData.push({ json: response });
        } else if (operation === 'get') {
          const id = this.getNodeParameter('id', i) as string;

          const response = await this.helpers.httpRequestWithAuthentication.call(
            this,
            'myApi',
            {
              method: 'GET',
              url: `${credentials.baseUrl}/api/records/${id}`,
              json: true,
            },
          );

          returnData.push({ json: response });
        } else if (operation === 'getMany') {
          const limit = this.getNodeParameter('limit', i) as number;

          const response = await this.helpers.httpRequestWithAuthentication.call(
            this,
            'myApi',
            {
              method: 'GET',
              url: `${credentials.baseUrl}/api/records`,
              qs: { limit },
              json: true,
            },
          );

          const records = Array.isArray(response) ? response : response.data || [];
          for (const record of records) {
            returnData.push({ json: record });
          }
        } else if (operation === 'update') {
          const id = this.getNodeParameter('id', i) as string;
          const name = this.getNodeParameter('name', i) as string;
          const additionalFields = this.getNodeParameter('additionalFields', i) as Record<string, unknown>;

          const body: Record<string, unknown> = { name, ...additionalFields };

          const response = await this.helpers.httpRequestWithAuthentication.call(
            this,
            'myApi',
            {
              method: 'PUT',
              url: `${credentials.baseUrl}/api/records/${id}`,
              body,
              json: true,
            },
          );

          returnData.push({ json: response });
        } else if (operation === 'delete') {
          const id = this.getNodeParameter('id', i) as string;

          await this.helpers.httpRequestWithAuthentication.call(
            this,
            'myApi',
            {
              method: 'DELETE',
              url: `${credentials.baseUrl}/api/records/${id}`,
              json: true,
            },
          );

          returnData.push({ json: { success: true, id } });
        }
      } catch (error) {
        if (this.continueOnFail()) {
          returnData.push({ json: { error: (error as Error).message }, pairedItem: { item: i } });
          continue;
        }
        throw error;
      }
    }

    return [returnData];
  }
}
```

Key things this example demonstrates:
- Looping over `this.getInputData()` per item, not processing all items as a batch
- `this.getNodeParameter(name, i)` reads a parameter for the *i*-th item, since expressions can vary per item
- `this.helpers.httpRequestWithAuthentication` injects the right auth headers/tokens from the node's credential automatically
- `continueOnFail()` lets a workflow keep going past a single item's failure instead of aborting the whole execution — always check for it in the catch block
- Every output is wrapped in `{ json: {...} }`, matching `INodeExecutionData`

## Property Types Reference

| Type | Description | TypeOptions |
|------|-------------|-------------|
| `string` | Text input | `password`, `rows` (textarea) |
| `number` | Numeric input | `minValue`, `maxValue`, `numberStepSize` |
| `boolean` | Toggle | — |
| `options` | Dropdown | Use `options` array |
| `multiOptions` | Multi-select | Use `options` array |
| `collection` | Group of optional fields | Use `options` array |
| `fixedCollection` | Group of required fields | Use `values` array |
| `color` | Color picker | — |
| `dateTime` | Date/time picker | — |
| `json` | JSON editor | — |
| `resourceLocator` | Resource picker with search | `modes` |

## Display Options

Control when properties are shown:
```typescript
{
  displayOptions: {
    show: {
      operation: ['create', 'update'],     // show when operation is create OR update
      resource: ['user'],                   // AND resource is user
    },
    hide: {
      operation: ['delete'],               // hide when operation is delete
    },
  },
}
```
