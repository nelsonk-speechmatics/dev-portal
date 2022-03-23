import { createStandaloneToast } from '@chakra-ui/react';
import { msalLogout } from './msal-utils';

const toast = createStandaloneToast();

const ENDPOINT_API_URL = process.env.ENDPOINT_API_URL;

export const errToast = (descr: string | any) =>
  toast({
    title: 'An error occurred.',
    description: typeof descr === 'string' ? descr : JSON.stringify(descr),
    status: 'error',
    duration: 9000,
    position: 'bottom-right',
    isClosable: true,
  });

export const positiveToast = (descr: string) =>
  toast({
    description: descr,
    status: 'success',
    duration: 9000,
    position: 'bottom-right',
    isClosable: true,
  });

export const callPostAccounts = async (accessToken: string) => {
  return call(accessToken, `${ENDPOINT_API_URL}/accounts`, 'POST');
};

export const callGetAccounts = async (idToken: string) => {
  return call(idToken, `${ENDPOINT_API_URL}/accounts`, 'GET');
};

export const callGetUsage = async (idToken: string, contractId: number, projectId: number) => {
  return call(idToken, `${ENDPOINT_API_URL}/usage`, 'GET', {
    contract_id: contractId,
    project_id: projectId,
    grouping: 'day',
    sort_order: 'asc',
  });
};

export const callRemoveApiKey = async (idToken: string, apiKeyId: string) => {
  return call(idToken, `${ENDPOINT_API_URL}/api_keys/${apiKeyId}`, 'DELETE');
};

export const callGetSecrChargify = async (idToken: string, contractId: number) => {
  return call(idToken, `${ENDPOINT_API_URL}/contracts/${contractId}/payment_token`, 'GET');
};

export const callPostRequestTokenChargify = async (
  idToken: string,
  contractId: number,
  chargifyToken: string
) => {
  return call(idToken, `${ENDPOINT_API_URL}/contracts/${contractId}`, 'PUT', {
    contract_request_token: chargifyToken,
  });
};

export const callPostApiKey = async (
  idToken: string,
  name: string,
  projectId: number,
  clientRef: string
) => {
  return call(idToken, `${ENDPOINT_API_URL}/api_keys`, 'POST', {
    project_id: projectId,
    name,
  });
};

export const callGetPayments = async (idToken: string) => {
  return call(idToken, `${ENDPOINT_API_URL}/payments`, 'GET');
};

export const call = async (
  authToken: string,
  apiEndpoint: string,
  method: string,
  body: any = null
) => {
  const headers = new Headers();
  const bearer = `Bearer ${authToken}`;

  headers.append('Authorization', bearer);
  headers.append('Content-Type', 'application/json');

  const options = {
    method: method,
    headers: headers,
    body: method.toLowerCase() != 'get' ? JSON.stringify(body) : undefined,
  };

  if (method.toLowerCase() == 'get' && !!body) {
    apiEndpoint = `${apiEndpoint}?${getParams(body)}`;
  }

  console.log('fetching', apiEndpoint, options);

  return fetch(apiEndpoint, options)
    .then(async (response) => {
      console.log(
        `response from`,
        apiEndpoint,
        options,
        'is:',
        await jsonCopy(response.clone()),
        response
      );
      if (response.status == 401) {
        msalLogout();
      }
      if (response.status != 200 && response.status != 201) {
        throw new Error(`response from ${method} ${apiEndpoint} has status ${response.status}`);
      }

      return response.json();
    })
    .catch((error) => {
      errToast(`details: ${error}`);
      console.log(error);
    });
};

function getParams(paramsObj: { [key: string]: string | number }) {
  return Object.keys(paramsObj).reduce(
    (prev, curr, i) => `${prev}${i != 0 ? '&' : ''}${curr}=${paramsObj[curr]}`,
    ''
  );
}

async function jsonCopy(response: Response) {
  try {
    return response.json();
  } catch (e) {}
}
