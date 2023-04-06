import { Packet } from "./Packet";

export class PacketManager {
    private packets: Packet[] = [];
    
    register(packet: Packet) {
        this.packets.push(packet);
    }

    all(): Packet[] {
        return this.packets;
    }
}