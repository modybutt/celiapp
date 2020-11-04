import gamificationState from "../manager/buddyManager/LoggingStore";
import DatabaseManager from "../manager/DatabaseManager";


export default class analyticsManager{

    static initializeAnalytics(email){
        this.email = email;
    }
    static addLog(componentName, additionalInfo = ""){
        var newlog = {}
        newlog.userId = this.email;
        newlog.additionalInfo = additionalInfo;
        newlog.componentName = componentName;
        newlog.timestamp= Date.now();
        newlog.gestureType = "Click";
        newlog.gamification = gamificationState.gamificationFlag;
        //var analytics = require('./analytics.json');
        //analytics.push(newlog);
        //var fs  = require('fs');
        console.log("newlog: ", newlog);
        //fs.writeFile('./analytics.json', JSON.stringify(analytics));


        newlog.name = Date.now();


        //createLogEvent(objData, onError, onSuccess) {..}

            DatabaseManager.getInstance().createLogEvent(newlog, /*tmpDateTime.getTime(),*/ () => {console.log("error from analytics")}, 
            () => console.log("success from analytics")
        );
    }
}