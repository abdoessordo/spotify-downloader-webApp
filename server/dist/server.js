"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const constants_1 = require("./constants");
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const axios_1 = __importDefault(require("axios"));
// const clientBaseUrl: string = "http://localhost:5173";
const clientBaseUrl = "https://spotify-downloader-web-app.vercel.app";
// import Spotify from "./Spotify";
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, morgan_1.default)("dev"));
app.use((0, cors_1.default)({ origin: "*" }));
/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
function generateRandomString(length) {
    let text = "";
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}
const stateKey = "spotify_auth_state";
app.get("/login", (req, res) => {
    const state = generateRandomString(16);
    res.cookie(stateKey, state);
    const scope = "user-read-private user-read-email";
    res.redirect("https://accounts.spotify.com/authorize?" +
        new URLSearchParams({
            response_type: "code",
            client_id: constants_1.CLIENT_ID,
            scope,
            redirect_uri: constants_1.REDIRECT_URI,
            state,
        }));
});
app.get("/callback", (req, res) => {
    const code = req.query.code || "";
    const state = req.query.state || "";
    (0, axios_1.default)({
        method: "post",
        url: "https://accounts.spotify.com/api/token",
        data: new URLSearchParams({
            grant_type: "authorization_code",
            code: code.toString(),
            redirect_uri: constants_1.REDIRECT_URI,
        }),
        headers: {
            "content-type": "application/x-www-form-urlencoded",
            Authorization: `Basic ${Buffer.from(`${constants_1.CLIENT_ID}:${constants_1.CLIENT_SECRET}`).toString("base64")}`,
        },
    })
        .then((response) => {
        if (response.status === 200) {
            const { access_token, refresh_token, expires_in } = response.data;
            const queryParams = new URLSearchParams({
                access_token,
                refresh_token,
                expires_in,
            });
            // TODO: Redirect to frontend
            res.redirect(`${clientBaseUrl}/?${queryParams.toString()}`);
            // TODO: pass tokens in query params
            // TODO: get user info
        }
        else {
            res.redirect(`${clientBaseUrl}/?error=invalid_token`);
        }
    })
        .catch((err) => {
        res.send(err);
    });
});
app.get("/refresh_token", (req, res) => {
    const refresh_token = req.query.refresh_token || "";
    (0, axios_1.default)({
        method: "post",
        url: "https://accounts.spotify.com/api/token",
        data: new URLSearchParams({
            grant_type: "refresh_token",
            refresh_token: refresh_token.toString(),
        }),
        headers: {
            "content-type": "application/x-www-form-urlencoded",
            Authorization: `Basic ${Buffer.from(`${constants_1.CLIENT_ID}:${constants_1.CLIENT_SECRET}`).toString("base64")}`,
        },
    })
        .then((response) => {
        res.send(response.data);
    })
        .catch((err) => {
        res.send(err);
    });
});
app.listen(constants_1.PORT, () => {
    console.log(`Server is listening on port ${constants_1.PORT}`);
});
