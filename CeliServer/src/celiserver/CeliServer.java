/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package celiserver;

import celiserver.model.Device;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.InetAddress;
import java.net.ServerSocket;
import java.net.Socket;
import java.util.logging.Level;
import java.util.logging.Logger;
	
/**
 *
 * @author Gerry
 */
public class CeliServer {
    public static int PORT = 8080;
    
    public static void main(String[] args) {
        ServerSocket server = null;
        
        if (args.length > 0) {
            PORT = Integer.parseInt(args[0]);
        }
        
        try {
            server = new ServerSocket(PORT);
            System.out.println("WebServer[:" + server.getLocalPort() + "] has started.\r\nWaiting for a connection...");
            
            while (true) {
                Socket client = server.accept();
                System.out.println("A client connected.");

                Device device = new Device(client);
                
                if (device.handshake()) {
                    device.start();
                }
            }
        } catch (IOException ex) {
            Logger.getLogger(CeliServer.class.getName()).log(Level.SEVERE, null, ex);
        } finally {
            if (server != null) {
                try {
                    server.close();
                } catch (IOException ex) {
                    // ignored
                }   
            }
        }
        
        System.out.println("WebServer has stopped.");
    }
    
    public static abstract class MessageListener extends Thread {

        protected final InputStream in;
        protected final OutputStream out;
        protected final InetAddress addr;
        
        protected boolean handshakeDone = false;
    
        public MessageListener(InputStream inputStream, OutputStream outputStream, InetAddress address) {
            this.in = inputStream;
            this.out = outputStream;
            this.addr = address;
        }
        
        @Override
        public void run() {
            System.out.println("MessageListener[" + this.addr.getHostAddress() + "] started.");
            
            byte[] encoded = new byte[64];
            
            try {
                while (isAlive() && handshakeDone) {
                    int len = in.read(encoded);
                    if (len <= 0) continue;
                    
                    byte[] decoded = new byte[encoded[1] - (byte) 128];
                    byte[] key = new byte[] { encoded[2], encoded[3], encoded[4], encoded[5] };
                    
                    for (int i = 6; i < len; i++) {
                        decoded[i - 6] = (byte) (encoded[i] ^ key[(i - 6) & 0x3]);
                    }
                    
                    String response = handleMessage(new String(decoded, 0, len - 6));
                    
                    if (response != null) {
                        decoded = response.getBytes();
                        len = decoded.length + 2;

                        encoded[0] = (byte) 0x81;
                        encoded[1] = (byte) decoded.length;

                        for (int i = 2; i < len; i++) {
                            encoded[i] = decoded[i - 2];
                        }

                        out.write(encoded, 0, len);
                    }
                }
            } catch (IOException ex) {
                Logger.getLogger(MessageListener.class.getName()).log(Level.SEVERE, null, ex);
            }
            
            System.out.println("MessageListener[" + this.addr.getHostAddress()+ "] stopped.");
        }
        
        protected abstract String handleMessage(String message);
    }
}
