import gamificationState from "../manager/buddyManager/LoggingStore";
import {Alert} from 'react-native';
import DatabaseManager from '../../src/manager/DatabaseManager';
import Events from '../../src/constants/Events';



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

        if(gamificationState.gamificationFlag){
            newlog.gamification = 1;
        } else {
            newlog.gamification = 0;
        }

        console.log("newlog: ", newlog);

        /*******************************************************DB save method ******************************************************/
        DatabaseManager.getInstance().createEvent(Events.LogEvent,null,newlog, null, () => { DatabaseManager.getInstance().updateLastRecorded(); });
    }
}

