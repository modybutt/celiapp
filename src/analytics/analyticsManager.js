import gamificationState from "../manager/buddyManager/LoggingStore";
import DatabaseManager from "../manager/DatabaseManager";
import Interactions from "../constants/Interactions";



export default class analyticsManager{



    static initializeAnalytics(email){
        this.email = email;
    }
    static addLog(componentName, interactionInfo = ""){
        var newlog = {}
        newlog.interactionInfo = interactionInfo;
        newlog.componentName = componentName;
        newlog.timestamp= Date.now();
        newlog.gamification = gamificationState.gamificationFlag;

        console.log("newlog: ", newlog);
        //newlog.name = Date.now();


        //createLogEvent(objData, onError, onSuccess) {..}

            DatabaseManager.getInstance().createLogEvent(newlog, /*tmpDateTime.getTime(),*/ () => {console.log("error from analytics")}, 
            () => console.log("")
        );
    }
}