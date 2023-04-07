import { PacketifyPacket } from "./PacketifyPacket";

export class PacketManager {
    private packets: PacketifyPacket[] = [];
    
    register(packet: PacketifyPacket) {
        this.packets.push(packet);
    }

    all(): PacketifyPacket[] {
        return this.packets;
    }
}