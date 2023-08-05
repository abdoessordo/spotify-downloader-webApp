"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const constants_1 = require("./constants");
const Spotify_1 = __importDefault(require("./Spotify"));
const morgan_1 = __importDefault(require("morgan"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, morgan_1.default)("dev"));
const client_id = process.env.CLIENT_ID
    ? process.env.CLIENT_ID
    : "CLIENT_ID_NOT_FOUND";
const client_secret = process.env.CLIENT_SECRET
    ? process.env.CLIENT_SECRET
    : "CLIENT_SECRET_NOT_FOUND";
const spotify1 = Spotify_1.default.getInstance(client_id, client_secret);
const spotify2 = Spotify_1.default.getInstance(client_id, client_secret);
app.get("/", (req, res) => {
    // test the singleton pattern
    res.send(`Access token 1: ${spotify1.accessToken} <br> Access token 2: ${spotify2.accessToken}`);
});
app.listen(constants_1.PORT, () => {
    console.log(`Server is listening on port ${constants_1.PORT}`);
});
