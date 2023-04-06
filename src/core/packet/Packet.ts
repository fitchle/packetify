import { FastifySchema } from "fastify";
import { ZodSchema, z } from "zod";

export class Packet {
  path: string = "/";
  method: PacketMethod = PacketMethod.GET;
  schema: FastifySchema = {};

  data: {params: {} | any, query: {} | any} = {params: {}, query: {}};

  read(data: {params: {} | any, query: {} | any} = {params: {}, query: {}} ): void {
    this.data = data;
  }

  handle(): void {}

  write(): any {
    return undefined;
  }
}

export function packet<T extends { new (...args: any[]): {} }>(
  path: string = "/",
  method: PacketMethod = PacketMethod.GET,
  schema: FastifySchema = {}
) {
  return (constructor: T) => {
    return class extends constructor {
      path = path;
      method = method;
      schema = schema;
    };
  };
}


export enum PacketMethod {
  GET = "GET",
  POST = "POST",
}
