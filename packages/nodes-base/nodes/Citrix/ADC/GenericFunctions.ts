import { OptionsWithUri } from 'request';

import { IExecuteFunctions, ILoadOptionsFunctions } from 'n8n-core';

import {
	IDataObject,
	IHookFunctions,
	IWebhookFunctions,
	JsonObject,
	NodeApiError,
} from 'n8n-workflow';

export async function citrixADCApiRequest(
	this: IExecuteFunctions | IWebhookFunctions | IHookFunctions | ILoadOptionsFunctions,
	method: string,
	resource: string,
	body: IDataObject = {},
	qs: IDataObject = {},
	uri?: string,
	option: IDataObject = {},
): Promise<any> {
	const { url } = (await this.getCredentials('citrixAdcApi')) as { url: string };

	let options: OptionsWithUri = {
		headers: {
			'Content-Type': 'application/json',
		},
		method,
		body,
		qs,
		uri: uri || `${url.replace(new RegExp('/$'), '')}/nitro/v1${resource}`,
		json: true,
	};

	options = Object.assign({}, options, option);

	try {
		return this.helpers.requestWithAuthentication.call(this, 'citrixAdcApi', options);
	} catch (error) {
		throw new NodeApiError(this.getNode(), error as JsonObject);
	}
}
