import { ZodTypeProvider, serializerCompiler, validatorCompiler } from "fastify-type-provider-zod";
import { PacketManager } from "./PacketManager";
import { FastifyBaseLogger, FastifyError, FastifyInstance, FastifyReply, FastifyRequest, FastifySchema, FastifyTypeProviderDefault, RawServerDefault, RouteGenericInterface } from "fastify";
import { ResolveFastifyRequestType } from "fastify/types/type-provider";
import { IncomingMessage, ServerResponse } from "http";
import { z } from "zod";
import { packet, PacketMethod, Packet } from "./Packet";

export function packetbase(fastify: FastifyInstance, opts: any, next: any) {
    const packetManager: PacketManager = opts.packetManager;

    fastify.setValidatorCompiler(validatorCompiler);
    fastify.setSerializerCompiler(serializerCompiler);

    packetManager.all().forEach(async (req) => {
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


    next()
}