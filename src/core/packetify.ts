import Fastify from "fastify";
import { PacketManager } from "./packet/PacketManager.js";
import { PacketifyPacket } from "./packet/PacketifyPacket.js";
import { packetbase } from "./packet/PacketPlugin.js";
import { authbase } from "./auth/AuthPlugin.js";
const fastify = Fastify();
import { PacketifyCLI } from "./cli/cli.js";

export class Packetify {
  private packetManager: PacketManager;
  opt: {};

  constructor(opt: {} = {}) {
    this.packetManager = new PacketManager();
    this.opt = opt;
  }

  async listen(port: number = 45317) {
    const cli: PacketifyCLI = new PacketifyCLI();

    fastify.listen({ port: port }, (err: any) => {
      if (err) throw err;
    });

    this.initPlugins();

    cli.run({ port: port, packets: this.packetManager.all() });
  }

  async initPlugins() {
    this.hookPlugins();
  }

  async hookPlugins() {
    fastify.register(authbase);
    fastify.register(packetbase, { packetManager: this.packetManager });
  }

  register(packet: PacketifyPacket): void {
    this.packetManager.register(packet);
  }
}
