/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package celiserver.model;

import java.io.IOException;
import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.net.InetSocketAddress;
import java.net.SocketException;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author Gerry
 */
public class Gear {
    private DatagramSocket host = null;
    
    public boolean link(String host) {
        try {
            String[] split = host.split(":");
            this.host = new DatagramSocket();
            this.host.connect(new InetSocketAddress(split[0], Integer.parseInt(split[1])));
            System.out.println("Gear[" + host + "] linked.");
            return true;
        } catch (NumberFormatException | SocketException ex) {
            Logger.getLogger(Gear.class.getName()).log(Level.SEVERE, null, ex);
        }
        return false;
    }

    public void unlink() {
        if (this.host == null) {
            return;
        }
        
        System.out.println("Gear[" + host + "] unlinked.");
        this.host.disconnect();
        this.host = null;
    }
    
    public void send(char character) {
        send(String.valueOf(character));
    }
    
    public void send(String message) {
        if (host == null) {
            return;
        }
        
        byte[] msg = message.getBytes();
        DatagramPacket packet = new DatagramPacket(msg, 0, msg.length);

        try {
            host.send(packet);
        } catch (IOException ex) {
            Logger.getLogger(Gear.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
}
