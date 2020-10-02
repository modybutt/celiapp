export default class analyticsManager{

    static initializeAnalytics(email){
        this.email = email;
    }
    static addLog(componentName, additionalInfo = ""){
        var newlog = {}
        newlog.userId = this.email;
        newlog.additionalInfo = additionalInfo;
        newlog.componentName = componentName;
        newlog.date = new Date();
        newlog.gestureType = "Click";
        var analytics = require('analytics.json');
        analytics.push(newlog);
        var fs  = require('fs');
        fs.writeFile('analytics.json', JSON.stringify(analytics));
    }
}