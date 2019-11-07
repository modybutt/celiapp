export default class GearManager {

  /**
   * @returns {GearManager}
   */
  static getInstance() {
      if (GearManager.instance == null) {
        GearManager.instance = new GearManager();
      }

      return this.instance;
  }

  getWsHost() {
    if (this.wsHost == null) {
      return "ws://192.168.1.125:8080";
    }

    return this.wsHost;
  }

  setWsHost(wsHost) {
    this.wsHost = wsHost;
  }

  getGearHost() {
    if (this.gearHost == null) {
      return "192.168.1.199:20000";
    }

    return this.gearHost;
  }

  setGearHost(gearHost) {
    this.gearHost = gearHost;
  }

  setListener(listener) {
    this.listener = listener;
  }

  connect() {
    this.ws = new WebSocket(this.wsHost);

    this.ws.onopen = e => {
      this.isConnected = true;

      // if (this.listener != null && this.listener.gearStateChanged != null) {
      //   this.listener.gearStateChanged();
      // }
    };

    this.ws.onmessage = e => {
      if (e.data == "linked") {
        this.isLinked = true;
      } else if (e.data == "unlinked") {
        this.isLinked = false;
      } else if (this.listener != null && this.listener.gearHandleMessage != null) {
        return this.listener.gearHandleMessage(e.data);
      } else {
        alert("unknown message: " + e.data);
      }
    };

    this.ws.onerror = e => {
      alert(e.message)
    };

    this.ws.onclose = e => {
      this.isLinked = false;
      this.isConnected = false;
      if (this.listener != null && this.listener.gearStateChanged != null) {
        this.listener.gearStateChanged();
      }
    };
  }

  disconnect() {
    if (this.isConnected == true) {
      if (this.isLinked == true) {
        this.unlink();
      }

      this.sendMessage("disconnect");
      this.ws = null;
    }
  }

  link() {
    if (this.isLinked == false) {
      this.ws.send("link " + this.gearHost);
    }
  }

  unlink() {
    if (this.isLinked == true) {
      this.ws.send("unlink");
    }
  }

  sendMessage(msg) {
    if (this.isConnected == true) {
      this.ws.send(msg);
    }
  }
}