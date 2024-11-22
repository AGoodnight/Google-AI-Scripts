import { transcribe } from "transcribe/transcribe";
import { promptChatBot } from "prompt/prompt";
import { program } from "commander";

function main() {
    program
        .argument('<speech>', 'speech as an audio file')
        .action(async (speech: string) => {
            const prompt: string = await transcribe(speech)
            console.log(prompt)
            const message: string = await promptChatBot(prompt);
            console.log(message)
        })
    program.parseAsync(process.argv)
}

main();