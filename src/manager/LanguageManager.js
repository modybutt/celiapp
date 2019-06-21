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
        this.instance.lang = languages.developer;
      }

      return this.instance;
  }

  getAllLanguages() {
    return languages;
  }

  setLanguage(language) {
    if (languages[language] != null) {
      this.lang = languages[language];
    } else {
      for (i in languages) {
        if (language === languages[i].name) {
          this.lang = languages[i];
        }
      }
    }
  }

  getLanguage() {
    return this.lang.name;
  }

  getText(key, params) {    
    text = this.lang.keys[key] == null ? key : this.lang.keys[key];

    if (params != null) {
      for (i in params) {
        text = text.split("{" + i + "}").join(params[i]);
      }
    }

    return text;
  }
}