import { program } from "commander";
import { promptChatBot } from "./prompt";

function main() {
    program
        .argument('<message>', 'A message to send the AI')
        .action(async (message: string) => {
            console.log(await promptChatBot(message))
        })
    program.parseAsync(process.argv)
}

main();