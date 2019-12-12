/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package celiserver.model;

import celiserver.CeliServer;
import celiserver.ui.MainFrame;
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
      
    public static final char COLOR_MODE = '1';
    public static final char DAYTIME_SET = '2';
    public static final char ENTRY_DONE = '3';
    
    private final Socket socket;
    private final Gear gear = new Gear();
    private final SimulationState state = new SimulationState(gear);
    private final MainFrame frame = new MainFrame(this);
    
    public Device(Socket socket) throws IOException {
        super(socket.getInputStream(), socket.getOutputStream(), socket.getInetAddress());
        this.socket = socket;
        this.frame.setTitle(socket.getInetAddress().getHostAddress());
    }

    @Override
    protected void cleanup() {
        frame.setVisible(false);
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
                out.flush();
                
                handshakeDone = true;
            } catch (NoSuchAlgorithmException | IOException ex) {
                Logger.getLogger(Device.class.getName()).log(Level.SEVERE, null, ex);
            }
        }
        
        frame.setVisible(handshakeDone);
        return handshakeDone;
    }

    @Override
    public String handleMessage(String message) {
        if (message.startsWith("link")) {
            return gear.link(message.split(" ")[1]) ? "linked" : "unlinked";
        }
        else if (message.startsWith("msg")) {
            performAction(message.split(" ")[1]);
        }
        else if (message.startsWith("unlink")) {
            gear.unlink();
            return "unlinked";
        } else if (message.equals("disconnect")) {
            try {
                socket.close();
            } catch (IOException ex) {
                Logger.getLogger(Device.class.getName()).log(Level.SEVERE, null, ex);
            }
        } else {
            System.err.println("unknown: " + message);
        }
        
        return null;
    }
    
    public void performAction(String action) {
        System.out.println("Device[" + this.addr.getHostAddress() + "]: " + action);
        
        char code = action.charAt(0);
        char value = action.charAt(1);
        
        switch (code) {
            case COLOR_MODE: {
                state.setColorMode(value);
                break;
            }
            case DAYTIME_SET: {
                state.setDayTime(value);
                break;
            }
            case ENTRY_DONE: {
                state.setEntry(value);
                break;
            }
        }
    }
    
    private static class SimulationState {
        private final Gear gear;
        
        private char colorMode;
        private char dayTime;
        private boolean emotionDone;
        private int mealCount;
        private boolean symptomDone;
        
        public SimulationState(Gear gear) {
            this.gear = gear;
        }
        
        private void setColorMode(char value) {
            colorMode = value;            
            gear.send(getColor());
        }
        
        private void setDayTime(char value) {
            dayTime = value;
            gear.send(getColor());
        }
        
        private void setEntry(char value) {
            switch (value) {
                case Entry.EMOTION: {
                    if (emotionDone) {
                        return;
                    }
                    
                    emotionDone = true;
                    break;
                }
                case Entry.MEAL: {
                    if (mealCount >= 3) {
                        return;
                    }
                    
                    mealCount++;
                    break;
                }
                case Entry.SYMPTOM: {
                    if (symptomDone) {
                        return;
                    }
                    
                    symptomDone = true;
                    break;
                }
                case Entry.RESET: {
                    mealCount = 0;
                    emotionDone = false;
                    symptomDone = false;
                    break;
                }
                default: {
                    return;
                }
            }
            
            gear.send(getColor());
        }
        
        private char getColor() {
            int entries = mealCount;
            //entries += emotionDone ? 1 : 0;
            //entries += symptomDone ? 1 : 0;
            entries += (emotionDone || symptomDone) ? 1 : 0;
            
            if (colorMode == ColorMode.RED_TO_GREEN) {
                if (dayTime == DayTime.NIGHT) {
                    return Color.BLACK;
                }
                
                // fallback
                if (entries < 0) {
                    entries = 0;
                } else if (entries > 4) {
                    entries = 4;
                }
            } else if (colorMode == ColorMode.GREEN_TO_RED) {
                entries += 4;       // "Bonus"
                
                switch (dayTime) {
                    case DayTime.MORNING: {
                        break;
                    }
                    case DayTime.FORENOON: {
                        entries -= 1;
                        break;
                    }
                    case DayTime.NOON: {
                        entries -= 2;
                        break;
                    }
                    case DayTime.AFTERNOON: {
                        entries -= 3;
                        break;
                    }
                    case DayTime.EVENING: {
                        entries -= 4;
                        break;
                    }
                    case DayTime.NIGHT: {
                        return Color.BLACK;
                    }
                }
                
                // fallback
                if (entries < 0) {
                    entries = 0;
                } else if (entries > 4) {
                    entries = 4;
                }
            } // -- end if (colorMode)
            
            switch (entries) {
                case 0: return Color.RED;
                case 1: return Color.LIGHT_RED;
                case 2: return Color.ORANGE;
                case 3: return Color.LIGHT_GREEN;
                case 4: return Color.GREEN;
                default: return Color.BLACK;
            }
        }
    }
    
    
    private static class ColorMode {
        public static final char RED_TO_GREEN = '0';
        public static final char GREEN_TO_RED = '1';
    }
    
    private static class Color {
        public static final char BLACK = '0';        
        public static final char GREEN = '1';
        public static final char LIGHT_GREEN = '2';
        //public static final char YELLOW = '3';
        public static final char ORANGE = '4';
        public static final char LIGHT_RED = '5';
        public static final char RED = '6';
    }
    
    private static class DayTime {
        public static final char MORNING = '0';
        public static final char FORENOON = '1';
        public static final char NOON = '2';
        public static final char AFTERNOON = '3';
        public static final char EVENING = '4';
        public static final char NIGHT = '5';
    }
    
    private static class Entry {
        /** @deprecated debug only */
        public static final char RESET = '~';
        public static final char EMOTION = '0';
        public static final char MEAL = '1';
        public static final char SYMPTOM = '2';
    }
}
