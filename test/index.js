const { Packetify } = require("packetify");
const { PacketifyPacket, Packet, PacketMethod } = require("packetify/src/core/packet/PacketifyPacket");
const { z } = require("zod");

const p = new Packetify();

@Packet("/", PacketMethod.GET, z.object({}))
class MyPacket extends PacketifyPacket {
    /**
     * 
     * READING QUERY & PARAMS DATA
     * 
     */
    read(data) {
        this.data = data;
    }


    /**
     * 
     * HANDLING SOMETHINGS
     * 
     */
    handle() {
        console.log(this.data.query)
    }


    /**
     * 
     * RESPONSE (SUCCESSFUL)
     * 
     */
    write() {
        return { "asdasdasd": "asdasd" };
    }


    /**
     * 
     * ERROR HANDLING (zod query errors etc.)
     * 
     */
    onError(error, request) {
        console.log(error)
        reply.send("ERROR!")
    }


}

p.register(new MyPacket())

p.listen();