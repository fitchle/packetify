import { PacketManager } from "./PacketManager.js";
import { FastifyInstance } from "fastify";
import type { HTTPMethods } from "fastify";
import { PacketMethod } from "./PacketifyPacket.js";

export function packetbase(fastify: FastifyInstance, opts: any, next: any) {
  const packetManager: PacketManager = opts.packetManager;

  fastify.addContentTypeParser('text/json', { parseAs: 'string' }, fastify.getDefaultJsonParser('ignore', 'ignore'))

  packetManager.all().forEach(async (req) => {    
    let schema: {} = {}
    switch (req.method) {
      case PacketMethod.GET:
        schema = {
          querystring: req.querySchema,
          params: req.paramSchema,
          headers: req.headerSchema
        };
        break;
      case PacketMethod.POST:
        schema = {
          querystring: req.querySchema,
          body: req.bodySchema,
          params: req.paramSchema,
          headers: req.headerSchema
        }
        break;
    }
    fastify.route({
      method: req.method as HTTPMethods,
      url: req.path,
      schema: schema,
      errorHandler(error, request, reply) {
        req.onError(error, request, reply);
      },
      onTimeout(request, reply) {
        req.onTimeout(request, reply);
      },
      handler: async (request, reply) => {
        req.read({ params: request.params, query: request.query, body: request.body, headers: request.headers });
        req.handle();
        return req.write();
      },
    });
  });

  next();
}

