import { Alert, Platform } from 'react-native';
import * as Permissions from 'expo-permissions';
import LanguageManager from './LanguageManager';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import UploadManager from './UploadManager';

//Listeners registered by this method will be called whenever a notification is received while the app is running.
if (global.listener == undefined) {
  Notifications.addNotificationReceivedListener(notification =>
  {
    console.warn("hello");
    console.warn('notification: ' + JSON.stringify(notification));
    const data = notification.request.content.data;
    if (data.screen == 'QUIZ') {
      global.navigation.navigate('QuizScreen', data);
    }
  });
  global.listener = true;
}

// TODO: refactor this and addNotificationReceivedListener - does it actually need to be outside the component in SDK 40?
// Listeners registered by this method will be called whenever a user interacts with a notification (eg. taps on it).
const subscription = Notifications.addNotificationResponseReceivedListener(notification =>
  {
    console.warn("hello2");
  console.warn('notification: ' + JSON.stringify(notification));

  //NB: notification.notification (different to in addNotificationReceivedListener)
    const data = notification.notification.request.content.data;
    if (data.screen == 'QUIZ') {
      setTimeout(() => {
        global.navigation.navigate('QuizScreen', data);
      }, 10000);
    }
});

//request permission to send notifications to user.
async function getiOSNotificationPermission() {
    const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    if (status !== 'granted') 
    {
        await Permissions.askAsync(Permissions.NOTIFICATIONS);
    }
};

// https://docs.expo.io/push-notifications/push-notifications-setup/
async function registerForPushNotificationsAsync() {
  if (Constants.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    if (existingStatus !== 'granted') {
      const { status: newStatus } = await Notifications.requestPermissionsAsync();
      existingStatus = newStatus;
    }
    if (existingStatus !== 'granted') {
      console.warn('Failed to get push token for push notification!');
      return;
    }
    const token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log('Token for push notifications: ' + token);
    
    UploadManager.getInstance().uploadPushToken(token, () => {
      console.log('Uploaded token for push notifications');
    });
  } else {
    console.warn('Must use physical device for push notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }
};

export default class NotificationManager {
  
    static getInstance()
    {
        if (NotificationManager.instance == null)
        {
            NotificationManager.instance = new NotificationManager();
            this.instance.initialize();
            //this.instance.scheduleNotification();
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
            data: {
                title: title,
                body: body
            }
        };
        
        let now = new Date();
        let tomorrow = new Date();
        tomorrow.setHours(now.getHours() + 12);

        // if the new time falls early in the morning or late at night, set it to the next morning
        if (tomorrow.getHours() <= 7 || tomorrow.getHours() >= 22)
        {
            tomorrow.setHours(8, 0, 0);
            tomorrow.setDate(tomorrow.getDate() + 1);
        }
        const schedulingOptions = { time: tomorrow };
        Notifications.scheduleLocalNotificationAsync(localnotification, schedulingOptions);
    }

    listenForNotifications = () =>
    {
      
    };

    initialize() 
    {
      console.log('Initialising notifications...');
      registerForPushNotificationsAsync();
      //getiOSNotificationPermission();
      this.listenForNotifications();
    }
}
