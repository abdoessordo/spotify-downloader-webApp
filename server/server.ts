import express, { Express } from "express";
import { CLIENT_ID, CLIENT_SECRET, PORT, REDIRECT_URI } from "./constants";
import cors from "cors";
import morgan from "morgan";
import axios from "axios";

const clientBaseUrl: string = "http://localhost:5173";

// import Spotify from "./Spotify";

const app: Express = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(cors({ origin: "*" }));

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
function generateRandomString(length: number): string {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

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

  res.redirect(
    "https://accounts.spotify.com/authorize?" +
      new URLSearchParams({
        response_type: "code",
        client_id: CLIENT_ID,
        scope,
        redirect_uri: REDIRECT_URI,
        state,
      })
  );
});

app.get("/callback", (req, res) => {
  const code = req.query.code || "";
  const state = req.query.state || "asd";

  axios({
    method: "post",
    url: "https://accounts.spotify.com/api/token",
    data: new URLSearchParams({
      grant_type: "authorization_code",
      code: code.toString(),
      redirect_uri: REDIRECT_URI,
    }),
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${Buffer.from(
        `${CLIENT_ID}:${CLIENT_SECRET}`
      ).toString("base64")}`,
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
      } else {
        res.redirect(`${clientBaseUrl}/?error=invalid_token`);
      }
    })
    .catch((err) => {
      res.send(err);
    });
});

app.get("/refresh_token", (req, res) => {
  const refresh_token = req.query.refresh_token || "";

  axios({
    method: "post",
    url: "https://accounts.spotify.com/api/token",
    data: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refresh_token.toString(),
    }),
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${Buffer.from(
        `${CLIENT_ID}:${CLIENT_SECRET}`
      ).toString("base64")}`,
    },
  })
    .then((response) => {
      res.send(response.data);
    })
    .catch((err) => {
      res.send(err);
    });
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
