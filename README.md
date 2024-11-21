# Sample Google Speech To Text Script
This is a simple node script you can run to send a WAV or other common audio file to googles cloud to have transcripted to text.

You will need to provide your own apikey, or modify method in which crednetials are sent to the api. I have simply parse a json, but there are other easier methods you can use.

```bash
npm install;
npm run -- "./yourfile.wav";
```

Google Documentation: https://cloud.google.com/nodejs/docs/reference/speech/latest