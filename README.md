# bq-verse-dictation
Node / React JS project for generating youtube videos of dictated Bible verses to help children
learn verses for Junior Bible Quizzing tournaments held by the 
[United Pentecostal Church International](https://www.najbq.com/)

The project encompasses a client and server application built to run locally (though you could probably
modify it to run deployed) that allows you to select the quizzing material, mark break points, etc.
with the final output being videos.

## CLIENT
The client is a React JS application using Fluent UI v9. It allows you to:
- Select the verses that are part of the seasons material
- Mark where repeats should occur
- Replace pronounciation of words to help the voice AI
- Preview the dictation
- Copy the verse text
- Select colors for the word animation
- Select the output font sizes for each verse
- Select the video frame rate
- Select the video resolution
- Select the speech voice
- Select the speech style
- Select the speech rate
- Save/Load the above configuration

After configuring the settings and tweaking the material, you can click the Generate button that will
generate videos for each verse.  Other content will be generated as well (like youtube break points)
that you can then use to post on a video service.

You can see some samples created for the Junior Bible Quizing 2023 season here:
https://www.youtube.com/playlist?list=PLiefi_xzqdSVTyWr_v8SAbO0V_kQrVfKS

### SETUP
Clone the repo locally, open a terminal, and run `npm install` in the `client` folder

### RUN
Open a terminal and run `npm start watch`

## SERVER
The server is a Node.js / Express application that handles all the I/O operations like audio generation,
image generation, audio streaming, FFMpeg execution, etc.  The server is called from the client mentioned
above and the client can't perform audio preview or generate videos unless the server is running.

## SETUP
Download a build of FFMpeg for your OS
Signup for Azure and create a Speech Service.
Create a .env file and set the following values:
```
SPEECH_KEY={your speech service key}
SPEECH_REGION={your speech service region}
DATA_OUT_DIR={where you want files to be placed}
TEMP_OUT_DIR={where you want the temp files to be placed}
FFMPEG_PATH={where you put the FFMpeg executable}
```

Open a terminal and run `npm install` in the `server` folder

## RUN
Open a terminal and run `npm run start:dev`

# SCREENSHOTS
Verse Selection
![Verse Selection](https://github.com/wnbittle/bq-verse-dictation/screenshots/client-verse-selection.png)

Color Selection
![Color Selection](https://github.com/wnbittle/bq-verse-dictation/screenshots/client-color-selection.png)

Font Size Selection
![Font Size Selection](https://github.com/wnbittle/bq-verse-dictation/screenshots/client-font-size-selection.png)

Other Settings
![Other Settings](https://github.com/wnbittle/bq-verse-dictation/screenshots/client-other-settings.png)

Generate
![Generate](https://github.com/wnbittle/bq-verse-dictation/screenshots/client-generate.png)


# ORIGINAL SETUP - CLIENT

```shell
npx create-react-app bg-verses-client --template typescript
npm install @fluentui/react-components
npm install @fluentui/react-icons
npm install chroma-js
npm install @types/chroma-js
```

# ORIGINAL SETUP - SERVER

```shell
npm init -y
npm i -D typescript @types/express
npm i express
npx tsc --init
npm install microsoft-cognitiveservices-speech-sdk
npm install -D @types/node
npm i cors @types/cors
npm install uuid @types/uuid
npm install node-html-to-image
npm install async-mutex
npm install get-video-duration
npm install dotenv
```