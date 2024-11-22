# Google AI Scripts
This is a simple node script library using a few google SDK libraries

You will need to provide your own service list credentials as a json file, and you will need your own environment json file to provide the neccessary variables for the scripts to run.

```bash
npm install;
```

### Transcribe Speech to Text

```bash
npm run transcribe -- "./yourspeech.wav";

"Hello, I am a hippo, what is water?"
```

### Prompt Google Vertex's Chatbot

```bash
npm run prompt -- "Hello, I am a hippo, what is water?";

"Greetings, aquatic friend! My name is Gemini, and I'm here to assist you with any questions you may have about water."
```

### Speak to Google Vertex's Chatbot

```bash
npm run speak -- "./yourspeach.wav"

"Hi there, Hippo! Water is a chemical compound with the formula H2O, consisting of two hydrogen atoms and one oxygen atom."