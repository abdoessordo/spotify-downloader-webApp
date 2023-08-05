import express, { Express } from "express";
import { PORT } from "./constants";
import Spotify from "./Spotify";
import morgan from "morgan";

const app: Express = express();

app.use(express.json());

app.use(morgan("dev"));

const client_id: string = process.env.CLIENT_ID
  ? process.env.CLIENT_ID
  : "CLIENT_ID_NOT_FOUND";
const client_secret: string = process.env.CLIENT_SECRET
  ? process.env.CLIENT_SECRET
  : "CLIENT_SECRET_NOT_FOUND";

const spotifyClient = Spotify.getInstance(client_id, client_secret);

app.get("/", (req, res) => {
  spotifyClient.getArtistData("4Z8W4fKeB5YxbusRsdQVPb").then((data) => {
    res.send(data);
  });
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
