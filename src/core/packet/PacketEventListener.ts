import { FastifyError, FastifyReply, FastifyRequest } from "fastify";

export abstract class PacketEventListener {
    onError(error: FastifyError, request: FastifyRequest, reply: FastifyReply): void {}
    onTimeout(request: FastifyRequest, reply: FastifyReply): void {}
}