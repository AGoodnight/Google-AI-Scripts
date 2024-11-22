import { readFileSync } from 'fs'
import { resolve } from 'path'

import { SpeechClient } from '@google-cloud/speech'
import { parseJSON } from "shared/parse-json";

export async function transcribe(file: string): Promise<string> {
    const audio = readFileSync(resolve(__dirname, file));
    const env = parseJSON('../environment.json');
    const keyFilePath = resolve(__dirname, `../${(env.keyFileName)}`)
    const client = new SpeechClient({
        keyFile: keyFilePath
    });
    const [response] = await client.recognize({
        audio: { content: audio },
        config: {
            encoding: 'LINEAR16',
            languageCode: 'en-US',
        }
    })

    try {
        const transcription = response.results!
            .map(result => result.alternatives![0].transcript)
            .join('\n');

        return transcription
    } catch (e: any) {
        throw new Error(e.message)
    }

}