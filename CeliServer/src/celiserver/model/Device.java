/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package celiserver.model;

import celiserver.CeliServer;
import java.io.IOException;
import java.net.Socket;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;
import java.util.Scanner;
import java.util.logging.Level;
import java.util.logging.Logger;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 *
 * @author Gerry
 */
public class Device extends CeliServer.MessageListener {
      
    private final Gear gear = new Gear();
    
    public Device(Socket socket) throws IOException {
        super(socket.getInputStream(), socket.getOutputStream(), socket.getInetAddress());
    }
    
    public boolean handshake() {
        if (handshakeDone == true) {
            return true;
        }
        
        Scanner s = new Scanner(in, "UTF-8");
        String data = s.useDelimiter("\\r\\n\\r\\n").next();
        Matcher get = Pattern.compile("^GET").matcher(data);

        if (get.find()) {
            try {
                Matcher match = Pattern.compile("Sec-WebSocket-Key: (.*)").matcher(data);
                match.find();
                
                byte[] response = ("HTTP/1.1 101 Switching Protocols\r\n"
                        + "Connection: Upgrade\r\n"
                        + "Upgrade: websocket\r\n"
                        + "Sec-WebSocket-Accept: "
                        + Base64.getEncoder().encodeToString(MessageDigest.getInstance("SHA-1").digest((match.group(1) + "258EAFA5-E914-47DA-95CA-C5AB0DC85B11").getBytes("UTF-8")))
                        + "\r\n\r\n").getBytes("UTF-8");
                out.write(response, 0, response.length);
                
                handshakeDone = true;
            } catch (NoSuchAlgorithmException | IOException ex) {
                Logger.getLogger(Device.class.getName()).log(Level.SEVERE, null, ex);
            }
        }
        
        return handshakeDone;
    }

    @Override
    protected String handleMessage(String message) {
        if (message.startsWith("link")) {
            return gear.link(message.split(" ")[1]) ? "linked" : "unlinked";
        }
        else if (message.startsWith("msg")) {
            gear.send(message.split(" ")[1]);
        }
        else if (message.startsWith("unlink")) {
            gear.unlink();
            return "unlinked";
        }
        else {
            System.err.println("unknown: " + message);
        }
        
        return null;
    }
}
