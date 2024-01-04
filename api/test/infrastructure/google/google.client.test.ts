import { randomUUID } from 'crypto';
import { parse } from 'querystring';

import { GoogleClient } from '@src/infrastructure/google/google.client';
import { GoogleClientConfig } from '@src/infrastructure/google/types';

describe('Test google client', () => {
  let client: GoogleClient;
  let config: GoogleClientConfig;

  beforeAll(() => {
    config = {
      oauth: {
        clientId: 'test_client_id',
        clientSecret: 'test_client_secret',
        redirectPath: '/api/v1/google/sign-in/token',
        authEndpoint: 'https://accounts.google.com/o/oauth2/auth',
        tokenEndpoint: 'https://oauth2.googleapis.com/token'
      }
    };
    client = new GoogleClient(config);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should build valid OIDC request', () => {
    const givenBaseUrl = 'http://localhost:8080';
    const givenState = randomUUID();
    const expectedQueyObject = {
      client_id: config.oauth.clientId,
      response_type: 'code',
      redirect_uri: `${givenBaseUrl}${config.oauth.redirectPath}`,
      scope: 'openid email',
      state: givenState,
      access_type: 'online',
      prompt: 'consent select_account'
    };

    const result = client.buildOidcRequest(givenBaseUrl, givenState);
    const [authEndpoint, queryString] = result.split('?');

    expect(authEndpoint).toEqual(config.oauth.authEndpoint);
    expect(parse(queryString)).toEqual(
      expect.objectContaining(expectedQueyObject)
    );
  });
});
