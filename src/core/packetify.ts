"use strict";

import Fastify, { FastifyBaseLogger, FastifyError, FastifyReply, FastifyRequest, FastifySchema, FastifyTypeProviderDefault, RawServerDefault, RouteGenericInterface } from 'fastify'

const fastify = Fastify({
    logger: true
})

import fp from 'fastify-plugin';

import config from '../assets/config.json';
import { PacketManager } from './packet/PacketManager';
import { Packet, PacketMethod, packet } from './packet/Packet';
import { z } from 'zod';
import { ZodTypeProvider, serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod';
import { ResolveFastifyRequestType } from 'fastify/types/type-provider';
import { IncomingMessage, ServerResponse } from 'http';
import { packetbase } from './packet/PacketPlugin';
import { authbase } from './auth/AuthPlugin';



export class Packetify {
    packetManager: PacketManager = new PacketManager();

    async listen(port: number = config.server.port) {
        fastify.listen({ port: port }, (err: any) => {
            if (err) throw err
        })

        this.init();
    }

    private async init() {
        this.hookPlugins();
    }


    async hookPlugins() {
        fastify.register(authbase)
        fastify.register(packetbase, {packetManager: this.packetManager})
    }

    register(packet: Packet): void {
        this.packetManager.register(packet);
    }
}

const packetify = new Packetify();

@packet("/qwe/:id", PacketMethod.GET, z.object({
    username: z.string().max(3),
    password: z.string()
}))
class TestPacket extends Packet {
    read(data: any): void {
        this.data = data;
    }

    handle(): void {
        console.log(this.data.query)
    }

    write() {
        return {"asdasdasd": "asdasd"};
    }

    onError(error: FastifyError, request: FastifyRequest<RouteGenericInterface, RawServerDefault, IncomingMessage, FastifySchema, FastifyTypeProviderDefault, unknown, FastifyBaseLogger, ResolveFastifyRequestType<FastifyTypeProviderDefault, FastifySchema, RouteGenericInterface>>, reply: FastifyReply<RawServerDefault, IncomingMessage, ServerResponse<IncomingMessage>, RouteGenericInterface, unknown, FastifySchema, FastifyTypeProviderDefault, unknown>): void {
        console.log(error)
        reply.send("ERROR!")
    }
}

packetify.register(new TestPacket())

packetify.listen();