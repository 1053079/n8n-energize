import {
    IExecuteFunctions,
} from 'n8n-core';

import {
    IDataObject,
    INodeExecutionData,
    INodeType,
    INodeTypeDescription,
} from 'n8n-workflow';

import {
    OptionsWithUri,
} from 'request';


export class CatApi implements INodeType {
    description: INodeTypeDescription = {
        displayName: 'Cat',
        name: 'cat',
        icon: 'file:cat.svg',
        group: ['transform'],
        version: 1,
        description: 'random cats',
        defaults: {
            name: 'Cat',
        },
        inputs: ['main'],
        outputs: ['main'],
        credentials: [
            {
                name: 'catApi',
                required: false,
            },
        ],
        // Basic node details will go here
        properties: [
            // Resources and operations will go here

            { // The resource for Energize //
                displayName: 'Resource',
                name: 'resource',
                type: 'options',
                options: [
                    {
                        name: 'Random Cat Picture',
                        value: 'randomcatpicture',
                    },
                ],
                default: 'Random Cat Picture',
                noDataExpression: true,
                required: true,
            },
            { // Operation indicates the action we want the node to do. 
                // For now let's give it a SEND action //
                displayName: 'Operation',
                name: 'operation',
                type: 'options',
                displayOptions: {
                    show: {
                        resource: [
                            'randomcatpicture',
                        ],
                    },
                },
                options: [
                    {
                        name: 'Send',
                        value: 'send',
                        description: 'sends a picture',
                        action: 'Send a picture',
                    },
                ],
                default: 'send',
                noDataExpression: true,
            },
            // Requires the CHAT ID so we can send it to 
            // the corresponding Telegram Chat 
            //     displayName: 'Chat ID',
            //     name: 'chatId',
            //     type: 'string',
            //     required: true,
            //     displayOptions: {
            //         show: {
            //             operation: [
            //                 'send',
            //             ],
            //             resource: [
            //                 'energyDrink',
            //             ],
            //         },
            //     },
            //     default: '',
            //     placeholder: 'Telegram Chat Id..',
            //     noDataExpression: false,
            //     description: 'Please give Chat ID so we can do something.',
            // }, { // Requires the CHAT ID so we can send it to 
            //     // the corresponding Telegram Chat 
            //     displayName: 'Text',
            //     name: 'text',
            //     type: 'string',
            //     required: true,
            //     displayOptions: {
            //         show: {
            //             operation: [
            //                 'send',
            //             ],
            //             resource: [
            //                 'energyDrink',
            //             ],
            //         },
            //     },
            //     default: '',
            //     placeholder: '',
            //     noDataExpression: false,
            //     description: 'Send a text',
            // },

            { // Displays the Additional Fields in case the user needs it..
                displayName: 'Additional Fields',
                name: 'additionalFields',
                type: 'collection',
                placeholder: 'Add Field',
                default: {},
                displayOptions: {
                    show: {
                        resource: [
                            'randomcatpicture',
                        ],
                        operation: [
                            'send',
                        ],
                    },
                },
                options: [
                    {
                        displayName: 'First Name',
                        name: 'firstName',
                        type: 'string',
                        default: '',
                    },
                    {
                        displayName: 'Last Name',
                        name: 'lastName',
                        type: 'string',
                        default: '',
                    },
                ],
            },
        ],
    };
    // The execute method will go here
    async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
        // Handle data coming from previous nodes
        const items = this.getInputData();
        let responseData;
        const returnData = [];
        const resource = this.getNodeParameter('resource', 0) as string;
        const operation = this.getNodeParameter('operation', 0) as string;

        // For each item, make an API call to create a contact
        for (let i = 0; i < items.length; i++) {
            if (resource === 'randomcatpicture') {
                if (operation === 'send') {
                    // Get text input
                    const text = this.getNodeParameter('send', i) as string;
                    // Get additional fields input
                    const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
                    const data: IDataObject = {
                        text,
                    };

                    Object.assign(data, additionalFields);

                    // Make HTTP request according to https://sendgrid.com/docs/api-reference/
                    const options: OptionsWithUri = {
                        headers: {
                            'Accept': 'application/json',
                        },
                        method: 'PUT',
                        body: {
                            contacts: [
                                data,
                            ],
                        },
                        uri: 'https://api.thecatapi.com/v1/images',
                        json: true,
                    };
                    responseData = await this.helpers.requestWithAuthentication.call(this, 'catApi', options);
                    returnData.push(responseData);
                }
            }
        }
        // Map data to n8n data structure
        return [this.helpers.returnJsonArray(returnData)];
    }
}
