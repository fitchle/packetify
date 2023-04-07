import chalk from "chalk";

import tk from "terminal-kit";
const term = tk.terminal;
import align from "align-text";
import gradient from "gradient-string";
import prompt from "prompts";
import { PacketifyPacket } from "../packet/PacketifyPacket";

export class PacketifyCLI {
  async run(args: any) {

    term.clear();
    term
      .nextLine(1)
      .white(align(gradient("orange", "yellow")("📦  Packetify 📦"), 106));
    term
      .nextLine(2)
      .white(
        align(
          gradient("orange", "yellow")("packet") +
            chalk.white(" based ") +
            gradient("orange", "yellow")("asynchronous") +
            chalk.white(" rest library\n      for backend applications."),
          96
        )
      );
    term.nextLine(2).green(align("(read -> handle -> write)", 102));

    term.nextLine(3).white(align(this.calculatePackets(args.packets), 106))
    term
      .nextLine(2)
      .white(
        align(
          chalk.green("[!]") +
            " Server listening at " +
            gradient("blue", "#6366f1")("http://localhost:" + args.port + "/"),
          93
        )
      );
    term
      .nextLine(2)
      .white(
        align(
          "    " +
            chalk.bold("(r)") +
            " Restart    " +
            chalk.bold("(e)") +
            " Exit    " +
            chalk.bold("(b)") +
            " Build",
          93
        )
      );
    this.initPrompt();
  }

  private async initPrompt() {
    term.nextLine(3);
    await prompt({
      type: "text",
      name: "command",
      message: "Shell",
      validate: (command) => {
        if (command === "e") {
          const bar = term.progressBar({ title: chalk.red("Exiting...") + "" });
          setTimeout(() => {
            bar.stop();
            process.exit();
          }, 1000 * 1.3);
          return true;
        }
        if (command === "b") {
          return true;
        }
        return false;
      },
    });

    this.initPrompt();
  }

  private calculatePackets(packets: PacketifyPacket[]) {
    const packetNames: string[] = [];
    packets.forEach((packet) => packetNames.push(packet.name))
    const format = chalk.bold.yellow(packets.length) + chalk.white(" packets loaded.") + (packetNames.length > 0 ? chalk.gray("(" + packetNames.join(",") + ")") : "");
    return format;
  }
}
