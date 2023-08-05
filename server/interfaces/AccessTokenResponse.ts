/**
 * @interface AccessTokenResponse
 * @description Interface for the expected response from the server when
 *   obtaining an access token.
 * @property {string} access_token - The access token provided by the server.
 *                                  This token must be included in subsequent API
 *                                  requests
 *                                  to authenticate the user's access.
 * @property {string} token_type - The type of the token (e.g., "bearer").
 *                                 It indicates the type of authentication used.
 * @property {number} expires_in - The time in seconds until the token expires.
 *                                 After this period, the token will no longer be
 *                                 valid and a new one should be obtained from the
 *                                 server.
 */

export interface AccessTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}
