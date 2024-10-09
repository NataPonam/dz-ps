import React, { useEffect } from 'react';
import * as Notifications from 'expo-notifications';
import { useRouter } from 'expo-router';

export function NotificationsComponent() {
  const router = useRouter();
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: true,
    }),
  });
  useEffect(() => {
    const subscribe = Notifications.addNotificationReceivedListener((notification) => {
      console.log(notification);
    });
    const subscribeResponse = Notifications.addNotificationResponseReceivedListener(
      (notification) => {
        const page = notification.notification.request.content.data.page;
        console.log(page);

        router.navigate(`/(app)/test`);
      },
    );

    return () => {
      subscribe.remove();
      subscribeResponse.remove();
    };
  }, []);
  return <></>;
}
