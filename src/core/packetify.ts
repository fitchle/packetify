"use strict";

import Fastify from "fastify";
import config from "../assets/config.json";
import { PacketManager } from "./packet/PacketManager";
import { PacketifyPacket } from "./packet/PacketifyPacket";
import { packetbase } from "./packet/PacketPlugin";
import { authbase } from "./auth/AuthPlugin";
const fastify = Fastify();

import { PacketifyCLI } from "./cli/cli";

export class Packetify {
  packetManager: PacketManager = new PacketManager();
  
  async listen(port: number = config.server.port) {
    const cli: PacketifyCLI = new PacketifyCLI();

    fastify.listen({ port: port }, (err: any) => {
      if (err) throw err;
    });
    
    this.init();

    cli.run({ port: port, packets: this.packetManager.all() });
  }

  private async init() {
    this.hookPlugins();
  }

  private async hookPlugins() {
    fastify.register(authbase);
    fastify.register(packetbase, { packetManager: this.packetManager });
  }

  register(packet: PacketifyPacket): void {
    this.packetManager.register(packet);
  }
}
