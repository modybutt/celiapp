import LanguageManager from "./LanguageManager";

export default class GlutonManager {

  static messages = [
    "GLUTON_WELCOME",
    "GLUTON_TICKLE",
    "GLUTON_THANKS",
  ]

  /**
   * @returns {GlutonManager}
   */
  static getInstance() {
      if (GlutonManager.instance == null) {
        GlutonManager.instance = new GlutonManager();
        GlutonManager.instance.gluton = {
          happy: true,
          trust: 0.5,
          message: 0,
        };
      }

      return this.instance;
  }

  setBuddy(buddy) {
    this.gluton.buddy = buddy;
  }

  getBuddy() {
    if (this.gluton.buddy == null) {
      return LanguageManager.getInstance().getText("GLUTON_BUDDY");
    }

    return this.gluton.buddy;
  }

  setHappy(happy) {
    this.gluton.happy = happy;
  }

  isHappy() {
    return this.gluton.happy;
  }

  setTrust(trust) {
    this.gluton.trust = trust;
  }

  getTrust() {
    return this.gluton.trust;
  }

  setMessage(msg) {
    this.gluton.message = msg;
  }

  getMessage() {
    try {
      return GlutonManager.messages[this.gluton.message];
    } finally {
      this.gluton.message = 0;
    }
  }
}