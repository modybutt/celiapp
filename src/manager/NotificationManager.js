import { Alert, Platform } from 'react-native';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import LanguageManager from './LanguageManager';

//request permission to send notifications to user.
async function getiOSNotificationPermission()
{
    const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    if (status !== 'granted') 
    {
        await Permissions.askAsync(Permissions.NOTIFICATIONS);
    }
}

export default class NotificationManager 
{
    static getInstance()
    {
        if (NotificationManager.instance == null)
        {
            NotificationManager.instance = new NotificationManager();
            this.instance.initialize();
            this.instance.scheduleNotification();
        }
        return this.instance;
    }

    scheduleNotification() 
    {
        console.log("Scheduling a notification...");
        //every time the user logs anything, reset all current notifications
        Notifications.cancelAllScheduledNotificationsAsync();

        const title = LanguageManager.getInstance().getText('NOTIFICATION_TITLE');
        const body = LanguageManager.getInstance().getText('NOTIFICATION_BODY');

        const localnotification = 
        {
            title: title,
            body: body,
            android: { sound: true },
            ios: { sound: true },
        };
        
        let now = new Date();
        let tomorrow = new Date();
        tomorrow.setDate(now.getDate() + 1);

        // if the new time falls early in the morning or late at night, set it to the next morning
        if (tomorrow.getHours() <= 7 || tomorrow.getHours() >= 20)
        {
            tomorrow.setHours(8, 0, 0);
        }

        const schedulingOptions = { time: tomorrow };
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
