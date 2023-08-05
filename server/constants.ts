/**
 * * constants.ts
 *
 * @fileoverview: This file contains various constants used throughout the application.
 * Each constant represents a specific configuration, value, or option used in different parts of the app.
 * The constants are exported and can be used in other files. This file also reads the .env file and
 * sets the environment variables.
 *
 *
 * Author: Essordo Abdellah
 */

import dotenv from "dotenv";
dotenv.config();

/**
 * * PORT
 *
 * Description: This constant represents the port used by the server.
 * @type {number}
 * @default 3000
 */
export const PORT: number = process.env.PORT
  ? parseInt(process.env.PORT)
  : 3000;

/**
 * * ACCESS_TOKEN_URL
 *
 * Description: This constant represents the url used to get the access token from the Spotify API.
 * @type {string}
 * @default "https://accounts.spotify.com/api/token"
 */
export const ACCESS_TOKEN_URL: string =
  "https://accounts.spotify.com/api/token";

/**
 * * PLAYLISTS_URL
 *
 * Description: This constant represents the url used to get the playlists from the Spotify API.
 * @type {string}
 * @default "https://api.spotify.com/v1/browse/featured-playlists"
 */
export const PLAYLISTS_URL: string =
  "https://api.spotify.com/v1/browse/featured-playlists";

/**
 * * ARTISTS_URL
 *
 * Description: This constant represents the url used to get the artists from the Spotify API.
 * @type {string}
 * @default "https://api.spotify.com/v1/artists"
 */
export const ARTISTS_URL: string = "https://api.spotify.com/v1/artists";

/**
 * * GRANT_TYPE
 * Description: This constant represents the grant type used to get the access token from the Spotify API.
 * @type {enum}
 */
export enum GRANT_TYPE {
  CLIENT_CREDENTIALS = "client_credentials",
}
