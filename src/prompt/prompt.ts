import { GenerateContentResult, HarmBlockThreshold, HarmCategory, VertexAI } from '@google-cloud/vertexai';
import { parseJSON } from "shared/parse-json";
import { resolve } from 'path'

export async function promptChatBot(message: string): Promise<string> {
    const env = parseJSON('../environment.json');
    const keyPath = resolve(__dirname, `../${env.keyFileName}`);

    const client = new VertexAI({
        project: env.project,
        location: env.location,
        googleAuthOptions: {
            keyFile: keyPath
        }
    });

    const gModel = client.getGenerativeModel({
        model: env.textModel,
        safetySettings: [{ category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE }],
        generationConfig: { maxOutputTokens: 256 },
        systemInstruction: {
            role: 'system',
            parts: [{ "text": `For example, you are a helpful customer service agent.` }]
        }
    });

    const request = {
        contents: [{ role: 'user', parts: [{ text: message }] }]
    };

    const result: GenerateContentResult = await gModel.generateContent(request);
    try {
        const chatResponse = result.response.candidates?.find((c) => c.content.role === 'model')
        const chatResponseText = chatResponse?.content.parts.find((p) => !!p.text)?.text;
        if (chatResponseText) {
            return chatResponseText
        } else {
            throw new Error('Error: No Response from Chatbot')
        }
    } catch (e: any) {
        throw new Error(`An Error Occured: ${e.message}`)
    }
}