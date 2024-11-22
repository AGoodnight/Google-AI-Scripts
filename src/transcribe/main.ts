import { program } from "commander";
import { transcribe } from "./transcribe";

function main() {
    program
        .argument('<filePath>', 'audio file to transcript')
        .action(async (filePath: string) => {
            console.log(await transcribe(filePath))
        })
    program.parseAsync(process.argv)
}

main();