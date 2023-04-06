import { Packet } from "./Packet";

export class PacketManager {
    packets: Packet[] = [];
    
    register(packet: Packet) {
        this.packets.push(packet);
    }
}