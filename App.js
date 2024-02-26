import 'react-native-gesture-handler';
import { StyleSheet, Text, View } from 'react-native';
import { RootSiblingParent } from 'react-native-root-siblings';
import AppRoutes from "./src/routes/AppRoutes";
import { useFonts } from 'expo-font';
// import * as Notifications from 'expo-notifications';
import { useEffect } from 'react';
// import messaging from '@react-native-firebase/messaging';


export default function App() {


  
  // const requestUserPermission = async () => {
  //   const authStatus = await messaging().requestPermission();
  //   const enabled =
  //     authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
  //     authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  //   if (enabled) {
  //     console.log("Authorization status:", authStatus);
  //   }
  // };

// useEffect(() => {

// if (requestUserPermission()) {
//       messaging()
//         .getToken()
//         .then(
//           token => console.log(token)
//         );
//     }
//   }, []);

//   Notifications.setNotificationHandler({
//     handleNotification: async () => ({
//       shouldShowAlert: true,
//       shouldPlaySound: true,
//       shouldSetBadge: false,
//     }),
//   });

//   // Handle user clicking on a notification and open the screen
//   const handleNotificationClick = async (response) => {
//     const screen = response?.notification?.request?.content?.data?.screen;
//     if (screen !== null) {
//       navigation.navigate(screen);
//     }
//   };

//   // Listen for user clicking on a notification
//   useEffect(() => {
//   const notificationClickSubscription =
//     Notifications.addNotificationResponseReceivedListener(
//       handleNotificationClick
//     );

//   // Handle user opening the app from a notification (when the app is in the background)
//   messaging().onNotificationOpenedApp((remoteMessage) => {
//     console.log(
//       "Notification caused app to open from background state:",
//       remoteMessage.data.screen,
//       navigation
//     );
//     if (remoteMessage?.data?.screen) {
//       navigation.navigate(`${remoteMessage.data.screen}`);
//     }
//   });

//   // Check if the app was opened from a notification (when the app was completely quit)
//   messaging()
//     .getInitialNotification()
//     .then((remoteMessage) => {
//       if (remoteMessage) {
//         console.log(
//           "Notification caused app to open from quit state:",
//           remoteMessage.notification
//         );
//         if (remoteMessage?.data?.screen) {
//           navigation.navigate(`${remoteMessage.data.screen}`);
//         }
//       }
//     });

//   // Handle push notifications when the app is in the background
//   messaging().setBackgroundMessageHandler(async (remoteMessage) => {
//     console.log("Message handled in the background!", remoteMessage);
//     const notification = {
//       title: remoteMessage.notification.title,
//       body: remoteMessage.notification.body,
//       data: remoteMessage.data, // optional data payload
//     };

//     // Schedule the notification with a null trigger to show immediately
//     await Notifications.scheduleNotificationAsync({
//       content: notification,
//       trigger: null,
//     });
//   });

//   // Handle push notifications when the app is in the foreground
//   const handlePushNotification = async (remoteMessage) => {
//     const notification = {
//       title: remoteMessage.notification.title,
//       body: remoteMessage.notification.body,
//       data: remoteMessage.data, // optional data payload
//     };

//     await Notifications.scheduleNotificationAsync({
//       content: notification,
//       trigger: null,
//     });
//   };

//   const unsubscribe = messaging().onMessage(handlePushNotification);

//   // Clean up the event listeners
//   return () => {
//     unsubscribe();
//     notificationClickSubscription.remove();
//   };
// }, []);




  const [loaded] = useFonts({
    NunitoSansBold: require("./assets/fonts/NunitoSans-Bold.ttf"),
    NunitoSansSemiBold: require("./assets/fonts/NunitoSans-SemiBold.ttf"),
    // NunitoSansMedium: require("./assets/fonts/SF-Pro-Text-Medium.otf"),
    NunitoSansRegular: require("./assets/fonts/NunitoSans-Regular.ttf"),
  })

  if (!loaded) {
    return null;
  }


  



  return (
   <RootSiblingParent>
      <AppRoutes/>
   </RootSiblingParent>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
