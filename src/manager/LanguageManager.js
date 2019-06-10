const languages = {
  developer: require('../assets/languages/developer.json'),
  deutsch: require('../assets/languages/deutsch.json'),
}

export default class LanguageManager {

  /**
   * @returns {LanguageManager}
   */
  static getInstance() {
      if (LanguageManager.instance == null) {
        LanguageManager.instance = new LanguageManager();
        LanguageManager.instance.lang = languages.developer;
      }

      return this.instance;
  }

  setLanguage(language) {
    if (languages[language] != null) {
      this.lang = languages[language];
    }
  }

  getLanguage() {
    return this.lang.language;
  }

  getText(key) {      
    return this.lang.keys[key] == null ? key : this.lang.keys[key];
  }
}