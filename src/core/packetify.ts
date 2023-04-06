"use strict";

import Fastify, { FastifyBaseLogger, FastifyError, FastifyReply, FastifyRequest, FastifySchema, FastifyTypeProviderDefault, RawServerDefault, RouteGenericInterface } from 'fastify'

const fastify = Fastify({
    logger: true
})

import config from '../assets/config.json';
import { PacketManager } from './packet/PacketManager';
import { Packet, PacketMethod, packet } from './packet/Packet';
import { z } from 'zod';
import { ZodTypeProvider, serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod';
import { ResolveFastifyRequestType } from 'fastify/types/type-provider';
import { IncomingMessage, ServerResponse } from 'http';



export class Packetify {
    requestManager: PacketManager;
    
    constructor() {
        this.requestManager = new PacketManager();
    }

    async init() {

        fastify.listen({ port: config.server.port }, (err: any) => {
            if (err) throw err
        })
        
        fastify.setValidatorCompiler(validatorCompiler);
        fastify.setSerializerCompiler(serializerCompiler);

        this.requestManager?.packets.forEach(async (req) => {
            fastify.withTypeProvider<ZodTypeProvider>().route({
                method: req.method,
                url: req.path,
                schema: {
                    querystring: req.schema
                },
                errorHandler(error, request, reply) {
                    req.onError(error, request, reply);
                },
                onTimeout(request, reply) {
                    req.onTimeout(request, reply);
                },
                handler: async(request, reply) => {
                    req.read({params: request.params, query: request.query});
                    req.handle();
                    return req.write();
                }
            })
        })


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

    onError(error: FastifyError, request: FastifyRequest<RouteGenericInterface, RawServerDefault, IncomingMessage, FastifySchema, FastifyTypeProviderDefault, unknown, FastifyBaseLogger, ResolveFastifyRequestType<FastifyTypeProviderDefault, FastifySchema, RouteGenericInterface>>, reply: FastifyReply<RawServerDefault, IncomingMessage, ServerResponse<IncomingMessage>, RouteGenericInterface, unknown, FastifySchema, FastifyTypeProviderDefault, unknown>): void {
        console.log(error)
        reply.send("ERROR!")
    }
}

const pack = new TestPacket();
packetify.requestManager.register(pack)

packetify.init();