import { FastifyInstance } from "fastify";

export function authbase(fastify: FastifyInstance, opts: any, next: any) {
  next();
}
