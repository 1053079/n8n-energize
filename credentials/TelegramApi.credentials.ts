import {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class Energize implements ICredentialType {
	name = 'telegramApi';
	displayName = 'Telegram API';
	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			default: '',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '=Bearer {{$credentials.apiKey}}',
			},
		},
	};
	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://api.telegram.org',
			url: '/bot6485934659:AAHFgh0XGGrm2CIWood8UtHA4X2ewy6XLJw/sendDice?chat_id=-4093381765',
		},
	};
}
