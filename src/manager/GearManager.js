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
    return this.wsHost;
  }

  setWsHost(wsHost) {
    this.wsHost = wsHost;
  }

  getGearHost() {
    return this.gearHost;
  }

  setGearHost(gearHost) {
    this.gearHost = gearHost;
  }

  setListener(listener) {
    this.listener = listener;
  }

  connect() {
    if (this.wsHost == null) {
      return;
    }
    
    this.ws = new WebSocket(this.wsHost);

    this.ws.onopen = e => {
      this.isConnected = true;
      this.isLinked = false;

      if (this.gearHost != null) {
        this.link();
      }

      if (this.listener != null && this.listener.gearStateChanged != null) {
        this.listener.gearStateChanged();
      }
    };

    this.ws.onmessage = e => {
      if (e.data == "linked") {
        this.isLinked = true;
        if (this.listener != null && this.listener.gearStateChanged != null) {
          this.listener.gearStateChanged();
        }
      } else if (e.data == "unlinked") {
        this.isLinked = false;
        if (this.listener != null && this.listener.gearStateChanged != null) {
          this.listener.gearStateChanged();
        }
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
      //this.ws = null;
    }
  }

  link() {
    alert(this.isLinked)
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