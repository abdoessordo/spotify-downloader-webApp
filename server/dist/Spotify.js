"use strict";
/**
 * * Class: Spotify
 *
 * Description: This class is used to interact with the Spotify API and create an abstraction layer between the
 *   API and the application.
 *
 * Attributes:
 *   @param _accessToken @type {string} The token used to interact with the API.
 *   @param _client_id @type {string} The client id of the application, obtained from the Spotify API.
 *   @param _client_secret  @type {string} The client secret of the application, obtained from
 *   the Spotify API.
 *
 * Methods:
 *   - getToken(): void - Gets the token from the Spotify API, using the client id and the client secret.
 *   - refreshToken(): void - Refreshes the token after it expires, using the client id and the
 *   client secret.
 *   - getPlaylist(playlist_id: string): void - Gets a single playlist from the Spotify API using
 *   the playlist id.
 *   - getInstance(client_id: string, client_secret: string): Spotify - Implements the singleton
 *   pattern to get a single instance of the class Spotify.
 *
 * Author: Essordo Abdellah
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("./constants");
class Spotify {
    /**
     * * Constructor: Spotify
     * Description: Private constructor to implement the singleton pattern.
     * @param client_id @type {string}  The client id of the application, obtained from the Spotify API.
     * @param client_secret @type {string}  The client secret of the application, obtained
     * from the Spotify API.
     * @returns void
     */
    constructor(client_id, client_secret) {
        this._client_id = client_id;
        this._client_secret = client_secret;
        this._accessToken = "";
        // Initialize the token
        this.initializeToken();
    }
    // * Getters and setters
    get client_id() {
        return this._client_id;
    }
    set client_id(value) {
        this._client_id = value;
    }
    get client_secret() {
        return this._client_secret;
    }
    set client_secret(value) {
        this._client_secret = value;
    }
    get accessToken() {
        return this._accessToken;
    }
    set accessToken(value) {
        this._accessToken = value;
    }
    /**
     * * Function: InitializeToken
     * description: Initializes the token by calling getToken()
     * and saving the token in the _accessToken attribute. It also checks if the
     *  token is close to expiration, and if so, calls refreshToken() to
     * refresh the token.
     * @returns Promise<void>
     * ! Not implemented yet. It will call getToken() to get the token from the Spotify API.
     */
    initializeToken() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Initializing token...");
            try {
                const accessTokenData = yield this.getToken();
                this._accessToken = accessTokenData.access_token;
                // TODO: Check if the token expiration date is close, and if so, call refreshToken() to refresh the token.You can compare the token's expiration time with the current time to make this decision. If the token is close to expiration, call this.refreshToken();
            }
            catch (error) {
                console.error("Error in initializeToken:", error);
                throw error;
            }
        });
    }
    /**
     * * Function: getToken
     * Description: Gets the token from the Spotify API, using the client id and the client secret.
     * @returns Promise<AccessTokenResponse>
     * ! Not implemented yet. It will make an API request to get the token based on the client_id and client_secret.
     */
    getToken() {
        return __awaiter(this, void 0, void 0, function* () {
            /**
             * Explanation:
             * 1. Make a POST request to the ACCESS_TOKEN_URL, with the following headers:
             *   - Content-Type: application/x-www-form-urlencoded
             * 2. The body of the request should contain the following parameters:
             *  - grant_type: client_credentials
             * - client_id: the client id of the application
             * - client_secret: the client secret of the application
             * 3. The response will contain the access token, which will be saved in the
             * _accessToken attribute.
             */
            try {
                const headers = {
                    "Content-Type": "application/x-www-form-urlencoded",
                };
                const body = new URLSearchParams({
                    grant_type: constants_1.GRANT_TYPE.CLIENT_CREDENTIALS,
                    client_id: this._client_id,
                    client_secret: this._client_secret,
                });
                const response = yield fetch(constants_1.ACCESS_TOKEN_URL, {
                    method: "POST",
                    headers: headers,
                    body: body,
                });
                if (!response.ok) {
                    throw new Error(`Error fetching access token: ${response.status} ${response.statusText}`);
                }
                const accessTokenData = yield response.json();
                return accessTokenData;
            }
            catch (error) {
                console.error("Error in getToken:", error);
                throw error;
            }
        });
    }
    /**
     * * Function: refreshToken
     * Description: Refreshes the token after it expires, using the client id and the client secret.
     * @returns void
     * ! Not implemented yet. It will make an API request to refresh the token based on the client_id and client_secret.
     */
    refreshToken() {
        // TODO: Implement the method
    }
    /**
     * * Function: getPlaylist
     * Description: Gets a single playlist from the Spotify API using the playlist id.
     * @param playlist_id @type {string}  The id of the playlist.
     * ! Not implemented yet. It will make an API request to get the playlist details.
     */
    getPlaylist(playlist_id) {
        // TODO: Implement the method
    }
    /**
     * * Function: getInstance
     * Description: Implements the singleton pattern to get a single instance of the class Spotify.
     * @param client_id @type {string}  The client id of the application, obtained from the Spotify API.
     * @param client_secret @type {string}  The client secret of the application, obtained from the Spotify API.
     * @returns Spotify
     * ! This method ensures that only one instance of Spotify class exists throughout the application.
     */
    static getInstance(client_id, client_secret) {
        if (!Spotify._instance) {
            Spotify._instance = new Spotify(client_id, client_secret);
        }
        return Spotify._instance;
    }
}
Spotify._instance = null;
exports.default = Spotify;
