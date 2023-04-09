import align from "align-text";
import gradient from "gradient-string";
import { PacketifyPacket } from "../packet/PacketifyPacket.js";
import { terminal } from "terminal-kit";
import kleur from "kleur";
import winston from "winston";

export const logger = winston.createLogger({
  levels: winston.config.syslog.levels,
  format: winston.format.combine(
    winston.format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    winston.format.metadata({ fillExcept: ["message", "level", "timestamp"] }),
    winston.format.printf(
      (info) =>
        JSON.stringify(
          {
            time: info.timestamp,
            level: info.level,
            message: info.message,
            data: info.metadata,
          },
          undefined,
          2
        ) + ","
    )
  ),
  transports: [new winston.transports.File({ filename: "packetify.log" })],
});

export class PacketifyCLI {
  promptLoc: [any, any] = [0, 0];

  async run(args: any) {
    terminal.clear();
    terminal.resetScrollingRegion();
    terminal
      .nextLine(1)
      .white(align(gradient("orange", "yellow")("📦  Packetify 📦"), 14));
    terminal
      .nextLine(2)
      .white(
        align(
          gradient("orange", "yellow")("packet") +
            kleur.white(" based ") +
            gradient("orange", "yellow")("asynchronous") +
            kleur.white(" rest library\n      for backend applications."),
          4
        )
      );
    terminal.nextLine(2).green(align("(read -> handle -> write)", 10));

    terminal.nextLine(2).white(align(this.calculatePackets(args.packets), 14));
    terminal
      .nextLine(2)
      .white(
        align(
          kleur.green("[!]") +
            " Server listening at " +
            gradient("blue", "#6366f1")("http://localhost:" + args.port + "/"),
          4
        )
      );
    terminal.hideCursor();
    this.initLogger();
  }

  private initLogger() {
    terminal.nextLine(2);

    logger.on("data", (chunk) => {
      let stops: any[] = [];
      switch (chunk.level) {
        case "error":
          stops = ["#e52d27", "#b31217"];
          break;
        case "warn":
          stops = ["#F2994A", "#F2C94C"];
          break;
        case "debug":
          stops = ["#7F00FF", "#E100FF"];
          break;
        case "info":
          stops = ["orange", "#a33129"];
          break;
      }
      if (chunk.message instanceof Object) {
        chunk.message =
          kleur.green("[" + typeof chunk.message + "] => ") +
          "\n\n" +
          kleur.gray(JSON.stringify(chunk.message, null, 2)) +
          "\n\n";
      }
      terminal.white(
        "\n" +
          kleur.gray().bold("{ " + chunk.timestamp + " }") +
          " " +
          kleur.bold(
            gradient("blue", "cyan")(`{ ${chunk.metadata.packet.method} }`)
          ) +
          " " +
          kleur.bold(
            gradient(
              "orange",
              "yellow"
            )(`{ 📦 ==> ${chunk.metadata.packet.path} }`)
          ) +
          " " +
          kleur.bold(gradient(stops)("[ " + chunk.level.toUpperCase() + " ]")) +
          " " +
          kleur.white(chunk.message)
      );
    });
  }
  private calculatePackets(packets: PacketifyPacket[]) {
    const format =
      kleur.yellow(packets.length) + kleur.white(" packets loaded.");
    return format;
  }
}
