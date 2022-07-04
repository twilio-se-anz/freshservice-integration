// Imports global types
import '@twilio-labs/serverless-runtime-types';
// Fetches specific types
import {
  Context,
  ServerlessCallback,
  ServerlessFunctionSignature,
} from '@twilio-labs/serverless-runtime-types/types';

import axios, { AxiosRequestConfig } from 'axios';

// MyEvent contains parameters passed as a POST body or URL query (POST & GET)
type MyEvent = {
  ticketId?: string;
};

// If you want to use environment variables, you will need to type them like
// this and add them to the Context in the function signature as
// Context<MyContext> as you see below.
type MyContext = {
  FRESHSERVICE_BASE_URL?: string;
  FRESHSERVICE_API_KEY?: string;
};

export const handler: ServerlessFunctionSignature = async function (
  context: Context<MyContext>,
  event: MyEvent,
  callback: ServerlessCallback
) {
  const auth: AxiosRequestConfig = {
    auth: {
      username: context.FRESHSERVICE_API_KEY ?? '',
      password: 'X',
    },
  };

  const response = new Twilio.Response();
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
  };
  response.setHeaders(headers);

  try {
    // See if the ticketId exists
    const getTicketsUri = `${context.FRESHSERVICE_BASE_URL}/tickets/${event.ticketId}`;
    const { data } = await axios.get(encodeURI(getTicketsUri), auth);
    response.setBody(data);
    return callback(null, response);
  } catch (error) {
    console.log(`getTickets error: ${error}`);
    // callback always returns 500 for errors
    return callback('ticket not found');
  }
};
