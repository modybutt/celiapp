const languages = {
  developer: require('../assets/languages/developer.json'),
  deutsch: require('../assets/languages/deutsch.json'),
  english: require('../assets/languages/english.json')
}

export default class LanguageManager {

  /**
   * @returns {LanguageManager}
   */
  static getInstance() {
      if (LanguageManager.instance == null) {
        LanguageManager.instance = new LanguageManager();
        LanguageManager.instance.lang = languages.deutsch;
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
    return this.lang.language;
  }

  getText(key) {      
    return this.lang.keys[key] == null ? key : this.lang.keys[key];
  }
}