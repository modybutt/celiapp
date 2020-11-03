import gamificationState from "../manager/buddyManager/LoggingStore";
import {Alert} from 'react-native';
import DatabaseManager from '../../src/manager/DatabaseManager';



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
        newlog.gamification = gamificationState.gamificationFlag;
        //var analytics = require('./analytics.json');
        //analytics.push(newlog);
        //var fs  = require('fs');
        console.log("newlog: ", newlog);

        /*******************************************************DB save method ******************************************************/
        //DatabaseManager.getInstance().createEvent("logEvent",null,newlog, null, () => { DatabaseManager.getInstance().updateLastRecorded(); });
        //fs.writeFile('./analytics.json', JSON.stringify(analytics));
    }
}