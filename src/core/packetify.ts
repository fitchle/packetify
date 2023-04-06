"use strict";

import Fastify from 'fastify'

const fastify = Fastify({
    logger: true
})

import config from '../assets/config.json';
import { PacketManager } from './packet/PacketManager';
import { Packet, PacketMethod, packet } from './packet/Packet';
import { string, z } from 'zod';

export class Packetify {
    requestManager: PacketManager;
    
    constructor() {
        this.requestManager = new PacketManager();
    }

    init() {
        fastify.listen({ port: config.server.port }, (err: any) => {
            if (err) throw err
        })

        this.requestManager?.packets.forEach((req) => {
            console.log(req.schema)
            fastify.route({
                method: req.method,
                url: req.path,
                schema: req.schema,
                handler: async(request, reply) => {
                    req.read({params: request.params, query: request.query});
                    req.handle();
                    return reply.code(200).send(req.write());
                }
            })
        })


    }
}

const packetify = new Packetify();

@packet("/qwe/:id", PacketMethod.GET, {querystring: {
    name: { type: 'string' },
    excitement: { type: 'integer' }
}})
class TestPacket extends Packet {
    read(data: any): void {
        this.data = data;
    }

    handle(): void {
        console.log(this.data.query.asasd)
    }

    write(): any {
        return "Test Packet!";
    }
}

const pack = new TestPacket();
console.log(pack.path)

packetify.requestManager.register(pack)

packetify.init();