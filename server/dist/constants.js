"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GRANT_TYPE = exports.ARTISTS_URL = exports.PLAYLISTS_URL = exports.ACCESS_TOKEN_URL = exports.REDIRECT_URI = exports.CLIENT_SECRET = exports.CLIENT_ID = exports.PORT = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
/**
 * * PORT
 *
 * Description: This constant represents the port used by the server.
 * @type {number}
 * @default 3000
 */
exports.PORT = process.env.PORT
    ? parseInt(process.env.PORT)
    : 3000;
/**
 * * CLIENT_ID
 * Description: This constant represents the client id used to get the access token from the Spotify API.
 * @type {string}
 * @default ""
 */
exports.CLIENT_ID = process.env.CLIENT_ID || "";
/**
 * * CLIENT_SECRET
 * Description: This constant represents the client secret used to get the access token from the Spotify API.
 * @type {string}
 * @default ""
 */
exports.CLIENT_SECRET = process.env.CLIENT_SECRET || "";
/**
 * * REDIRECT_URI
 * Description: This constant represents the redirect uri used to get the access token from the Spotify API.
 * @type {string}
 */
exports.REDIRECT_URI = process.env.REDIRECT_URI || "";
/**
 * * ACCESS_TOKEN_URL
 *
 * Description: This constant represents the url used to get the access token from the Spotify API.
 * @type {string}
 * @default "https://accounts.spotify.com/api/token"
 */
exports.ACCESS_TOKEN_URL = "https://accounts.spotify.com/api/token";
/**
 * * PLAYLISTS_URL
 *
 * Description: This constant represents the url used to get the playlists from the Spotify API.
 * @type {string}
 * @default "https://api.spotify.com/v1/browse/featured-playlists"
 */
exports.PLAYLISTS_URL = "https://api.spotify.com/v1/browse/featured-playlists";
/**
 * * ARTISTS_URL
 *
 * Description: This constant represents the url used to get the artists from the Spotify API.
 * @type {string}
 * @default "https://api.spotify.com/v1/artists"
 */
exports.ARTISTS_URL = "https://api.spotify.com/v1/artists";
/**
 * * GRANT_TYPE
 * Description: This constant represents the grant type used to get the access token from the Spotify API.
 * @type {enum}
 */
var GRANT_TYPE;
(function (GRANT_TYPE) {
    GRANT_TYPE["CLIENT_CREDENTIALS"] = "client_credentials";
})(GRANT_TYPE || (exports.GRANT_TYPE = GRANT_TYPE = {}));
