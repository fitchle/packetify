import { ZodSchema, z } from "zod";
import { PacketEventListener } from "./PacketEventListener";

export class PacketifyPacket extends PacketEventListener {
  name: string = this.constructor.name;
  path: string = "/";
  method: PacketMethod = PacketMethod.GET;
  schema: ZodSchema = z.object({});

  data: {params: {} | any, query: {} | any} = {params: {}, query: {}};

  constructor() {
    super();
  }

  read(data: {params: {} | any, query: {} | any} = {params: {}, query: {}} ): void {
    this.data = data;
  }

  handle(): void {}

  write(): any {
    return undefined;
  }
}

export function Packet<T extends { new (...args: any[]): {} }>(
  path: string = "/",
  method: PacketMethod = PacketMethod.GET,
  schema: ZodSchema = z.object({}),
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
