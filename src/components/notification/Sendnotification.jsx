
import { toast } from 'react-toastify';
import { getAccessToken } from './accesstoken';

const SendNotification = ({ userFcmToken, title, body }) => {
  const postUrl = 'https://fcm.googleapis.com/v1/projects/reactchat-1a08c/messages:send';

  const sendNotification = async () => {
    const accessToken = await getAccessToken();

    if (!accessToken) {
      toast.error('Failed to obtain access token.');
      return;
    }

    const mainObj = {
      message: {
        token: userFcmToken,
        notification: {
          title,
          body,
        },
      },
    };

    try {
      const response = await fetch(postUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify(mainObj),
      });

      if (response.ok) {
        toast.success('Notification sent successfully.');
      } else {
        const errorData = await response.json();
        toast.error(`Error sending notification: ${errorData.message}`);
      }
    } catch (error) {
      toast.error(`Error sending notification: ${error.message}`);
    }
  };

  return (
    <button onClick={sendNotification}>
      Send Notification
    </button>
  );
};

export default SendNotification;
