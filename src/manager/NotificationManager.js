import { Alert, Platform } from 'react-native';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';

//request permission to send notifications to user.
async function getiOSNotificationPermission()
{
    const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    if (status !== 'granted') 
    {
        await Permissions.askAsync(Permissions.NOTIFICATIONS);
    }
}

export default class Notifiationmanager 
{
    static getInstance()
    {
        if (Notifiationmanager.instance == null)
        {
            Notifiationmanager.instance = new Notifiationmanager();
            this.instance.initialize();
        }
        return this.instance;
    }

    scheduleNotification() 
    {
        //every time the user logs anything, reset all current notifications and 
        Notifications.cancelAllScheduledNotificationsAsync();

        const title = LanguageManager.getInstance().getText('NOTIFICATION_TITLE');
        const body = LanguageManager.getInstance().getText('NOTIFICATION_BODY');

        const localnotification = 
        {
            title: title,
            body: body,
            data: {
                title: title,
                body: body
            },
            android: { sound: true },
            ios: { sound: true },
        };
        
        let schedule = new Date();
        //12 * 60 seconds * 60 minutes * 1000 miliseconds.
        schedule.setTime(schedule.getTime() + 12 * 60 * 60 * 1000);

        //if the new time falls in the night or early in the morning, set it to the next morning at 9.
        if (schedule >= 20 || schedule <= 7)
        {
            schedule.setHours(8, 0, 0);
        }

        const schedulingOptions = { time: schedule };
        Notifications.scheduleLocalNotificationAsync(localnotification, schedulingOptions);
    }
    listenForNotifications = () =>
    {
        Notifications.addListener(notification => 
        {
            if (notification.origin === 'received' && Platform.OS === 'ios') 
            {
                if (notification.data)
                {
                    Alert.alert(notification.data.title, notification.data.body);
                }
            }
        });
    };
    initialize() 
    {
        getiOSNotificationPermission();
        this.listenForNotifications();
    }    
}