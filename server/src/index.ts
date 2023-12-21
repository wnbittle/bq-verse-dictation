// const express = require("express");
import express, { json, raw, urlencoded } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import { GenerateAudio } from './routes/api/GenerateAudio';
import { GenerateVideo } from './routes/api/GenerateVideo';
import { PrepareAudioPreview } from './routes/api/PrepareAudioPreview';
import { PreviewAudio } from './routes/api/PreviewAudio';

dotenv.config();

const PORT = process.env.PORT || 3001;

const app = express();

app.use(cors({
  origin: 'http://localhost:3000'
}));

app.use(urlencoded({ extended: true }));
app.use(json());
app.use(raw());

app.get("/api", (req: express.Request, res: express.Response) => {
  res.json({ message: "Hello from server!" });
});

const router = express.Router();
router.route('/api/GenerateAudio')
  .get(GenerateAudio)
  .post(GenerateAudio);

router.route('/api/GenerateVideo')
  .get(GenerateVideo)
  .post(GenerateVideo);

router.route('/api/PrepareAudioPreview')
  .get(PrepareAudioPreview)
  .post(PrepareAudioPreview);

router.route('/api/PreviewAudio')
  .get(PreviewAudio)
  .post(PreviewAudio);

app.use(router);

app.use((err: any, req: any, res: any, next: any) => {
  if (!err) {  
    return next();
  }

  console.error(err);
  res.status(500);
  res.send(`500: Internal server error ${err}`);
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});