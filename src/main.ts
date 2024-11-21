import { program } from "commander";
import { readFileSync } from 'fs'
import { resolve } from 'path'

import { SpeechClient } from '@google-cloud/speech'

function parseKeyFromAuth(file: string) {
    const keyFileContents = readFileSync(resolve(__dirname, file)).toString();
    const asJSON = JSON.parse(keyFileContents);
    return asJSON.apiKey
}

function main() {
    program
        .argument('<file>', 'audio file to transcript')
        .action(async (file) => {
            const audio = readFileSync(resolve(__dirname, file));
            const apiKey = (parseKeyFromAuth('./gc-auth.json'))
            const client = new SpeechClient({
                apiKey
            });
            const [response] = await client.recognize({
                audio: { content: audio },
                config: {
                    encoding: 'LINEAR16',
                    languageCode: 'en-US',
                }
            })
            const transcription = response.results!
                .map(result => result.alternatives![0].transcript)
                .join('\n');
            console.log(`Transcription: ${transcription}`);
        })
    program.parseAsync(process.argv)
}

main();