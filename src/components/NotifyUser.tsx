import { useEffect } from 'react';
import {  Button, Space, notification } from 'antd';

type NotificationType = 'success' | 'info' | 'warning' | 'error';

const NotifyUser = ({notifyType}:any) => {

  useEffect(() => {
    openNotificationWithIcon(notifyType)
  }, [])
  

  const [api, contextHolder] = notification.useNotification();

   const openNotificationWithIcon = (type: NotificationType) => {
    api[type]({
      message: 'Notification Title',
      description:
        'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
    });
  };

  return (
    <>
      {contextHolder}
    </>
  );
};

export default NotifyUser;