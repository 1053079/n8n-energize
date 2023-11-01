import {
    IExecuteFunctions,
} from 'n8n-core';

import {
    INodeExecutionData,
    INodeType,
    INodeTypeDescription,
} from 'n8n-workflow';

// import {
// 	LoggerProxy as Logger
// } from 'n8n-workflow';

import {
    OptionsWithUri,
} from 'request';


export class Cat implements INodeType {
    description: INodeTypeDescription = {
        displayName: 'Cat',  // Displays the name for our n8n node
        name: 'cat',
        icon: 'file:cat.svg', // The icon for our custom node
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
                name: 'catApi', // This matches the name set in CatApi.credentials.ts
                required: true,
            },
        ],
        // Basic node details will go here
        properties: [
            // Resources and operations will go here

            { // The resources for Cat Node  //
                displayName: 'Resource',
                name: 'resource',
                type: 'options',
                options: [
                    { // Default resource that gets a cat picture
                        name: 'Random Cat Picture',
                        value: 'randomcatpicture',
                    },
                    { // second option for random cat gifs
                        name: 'Random Cat GIFS',
                        value: 'randomcatgifs'
                    },
                ],
                default: 'randomcatpicture',
                noDataExpression: true,
                required: true,
            },
            { // Operation indicates the action we want the node to do. 
                // For now we only have GET which sends a get request to the api. //
                // The resource is which resource this operation will append itself to.//
                displayName: 'Operation',
                name: 'operation',
                type: 'options',
                displayOptions: {
                    show: {
                        resource: [
                            'randomcatpicture',
                            'randomcatgifs'
                        ],
                    },
                },
                options: [
                    {
                        name: 'Get',
                        value: 'get',
                        action: 'Get a picture',
                        description: 'Get a cat picture or gif.',
                        // routing: {
                        //     request: {
                        //         method: 'GET',
                        //         url: 'https://api.thecatapi.com/v1/images/search?has_breeds=1&api_key=live_rTcHLiRJhVBwWzluR6il6QLmjQ0640BMOzomWz5mb3EQ7NQFJYxyxtIvcdUB5RMG'
                        //     }
                        // }
                    },
                ],
                default: 'get',
                noDataExpression: true,
            },
            { // Shows the Display Cat Qualities option for the Cat Node in N8N
                displayName: 'Display Cat Qualities',
                name: 'displaycatqualities',
                type: 'options',
                required: true,
                displayOptions: {
                    show: {
                        operation: [
                            'get',
                        ],
                        resource: [
                            'randomcatpicture',
                        ],
                    },
                }, options: [
                    {
                        name: 'Yes',
                        value: 'yes',
                        action: 'Show qualities of the cat breed',
                        description: 'Shows qualities of the cat breed',
                    }, {
                        name: 'No',
                        value: 'no',
                        action: 'Do not show qualities of the cat breed',
                        description: 'Does not show the qualities of the cat breed',
                    }
                ],
                default: '',
                placeholder: '',
                noDataExpression: false,
                description: 'Displays additional information regarding the qualities of the breed.',
            },
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
                            'get',
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
        // const operation = this.getNodeParameter('operation', 0) as string;

        // For each item, make an API call to create a contact
        for (let i = 0; i < items.length; i++) {
            if (resource === 'randomcatpicture') {
                const qualities = this.getNodeParameter('displaycatqualities', 0) as string;
                if (qualities === 'yes') {
                    // if 'Display Cat Qualities' is set to Yes 
                    // Make HTTP request according to https://developers.thecatapi.com/view-account/ylX4blBYT9FaoVd6OhvR?report=bOoHBz-8t
                    const options: OptionsWithUri = {
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json header',
                        },
                        method: 'GET',
                        uri: 'https://api.thecatapi.com/v1/images/search?has_breeds=1&api_key=live_rTcHLiRJhVBwWzluR6il6QLmjQ0640BMOzomWz5mb3EQ7NQFJYxyxtIvcdUB5RMG',
                        json: true,
                    };
                    responseData = await this.helpers.requestWithAuthentication.call(this, 'catApi', options);
                    returnData.push(responseData);
                    console.log('response data is ' + responseData)
                } // If set to No it will have breeds as an empty array
                // This allows us to set an IF condition in N8N that checks whether or not the array is empty
                // if array is empty it will redirect the path and only show a picture.
                else {

                    const options: OptionsWithUri = {
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json header',
                        },
                        method: 'GET',
                        uri: 'https://api.thecatapi.com/v1/images/search?has_breeds=0&api_key=live_rTcHLiRJhVBwWzluR6il6QLmjQ0640BMOzomWz5mb3EQ7NQFJYxyxtIvcdUB5RMG',
                        json: true,
                    };
                    responseData = await this.helpers.requestWithAuthentication.call(this, 'catApi', options);
                    returnData.push(responseData);
                    console.log('response data is ' + responseData)
                }
            } // If user picks randomcatgifs this will happen
            // Only thing we change in the uri is change the query parameters
            // mime_types=gif only sends back cat gifs rather than pictures.
            else if (resource === 'randomcatgifs') {
                const options: OptionsWithUri = {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json header',
                    },
                    method: 'GET',
                    uri: 'https://api.thecatapi.com/v1/images/search?mime_types=gif&api_key=live_rTcHLiRJhVBwWzluR6il6QLmjQ0640BMOzomWz5mb3EQ7NQFJYxyxtIvcdUB5RMG',
                    json: true,
                };
                responseData = await this.helpers.requestWithAuthentication.call(this, 'catApi', options);
                returnData.push(responseData);
                console.log('response data is ' + responseData)
            } // else code just defaults to randomcatpicture.. same code
            else {
                const options: OptionsWithUri = {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json header',
                    },
                    method: 'GET',
                    uri: 'https://api.thecatapi.com/v1/images/search?has_breeds=1&api_key=live_rTcHLiRJhVBwWzluR6il6QLmjQ0640BMOzomWz5mb3EQ7NQFJYxyxtIvcdUB5RMG',
                    json: true,
                };
                responseData = await this.helpers.requestWithAuthentication.call(this, 'catApi', options);
                returnData.push(responseData);
                console.log('response data is ' + responseData)
            }
        }
        // Map data to n8n data structure
        return [this.helpers.returnJsonArray(returnData)];

    }
}


