import { ZodSchema, z } from "zod";
import { PacketEventListener } from "./PacketEventListener.js";
import { logger } from "../cli/cli.js";

export class PacketifyPacket extends PacketEventListener {
  path: string = "/";
  method: string = PacketMethod.GET;

  querySchema: ZodSchema = z.object({})
  bodySchema: ZodSchema = z.object({})
  paramSchema: ZodSchema = z.object({})
  headerSchema: ZodSchema = z.object({})

  constructor() {
    super();
    this.initLogger();
  }

  data: { params: {} | any; query: {} | any } = { params: {}, query: {} };

  read(
    data: { params: any; query: any; body: any, headers: any } = { params: {}, query: {}, body: {}, headers: {} }
  ): void {
    this.data = data;
  }

  handle(): void {
    return;
  }

  write(): any {
    return undefined;
  }

  private initLogger() {
    console.log = (...args) => {
      logger.info(...args, {packet: {
        method: this.method,
        path: this.path
      }})
    }

    console.error = (...args) => {
      logger.error(...args, {packet: {
        method: this.method,
        path: this.path
      }})
    }

    console.warn = (...args) => {
      logger.warn(...args, {packet: {
        method: this.method,
        path: this.path
      }})
    }

    console.debug = (...args) => {
      logger.debug(...args, {packet: {
        method: this.method,
        path: this.path
      }})
    }

    console.info = console.log;
  }
}

export function Packet<T extends { new (...args: any[]): {} }>(
  path: string = "/",
  method: string = PacketMethod.GET
) {
  return (constructor: T) => {
    return class extends constructor {
      path = path;
      method = method;
    };
  };
}

export function QuerySchema<T extends { new (...args: any[]): {} }>(
  schema: ZodSchema = z.object({})
) {
  return (constructor: T) => {
    return class extends constructor {
      querySchema = schema;
    };
  };
}

export function BodySchema<T extends { new (...args: any[]): {} }>(
  schema: ZodSchema = z.object({})
) {
  return (constructor: T) => {
    return class extends constructor {
      bodySchema = schema;
    };
  };
}

export function ParamSchema<T extends { new (...args: any[]): {} }>(
  schema: ZodSchema = z.object({})
) {
  return (constructor: T) => {
    return class extends constructor {
      paramSchema = schema;
    };
  };
}

export function HeaderSchema<T extends { new (...args: any[]): {} }>(
  schema: ZodSchema = z.object({})
) {
  return (constructor: T) => {
    return class extends constructor {
      headerSchema = schema;
    };
  };
}

export const PacketMethod = {
  GET: "GET",
  POST: "POST",
};
