import { Packetify, PacketifyPacket } from "packetify";

const p = new Packetify();



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

p.listen();