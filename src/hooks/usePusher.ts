import {useEffect, useState} from 'react';
import Pusher from 'pusher-js';
import * as PusherTypes from 'pusher-js';
import {getStoredUser} from 'userStorage';
import {UserSession} from 'models/session';
import {MessageType} from 'models/notification';
import {useUser} from './reactQuery/useUserSession';

export const usePusher = ({
  onMessageReceived,
}: {
  onMessageReceived: (event: MessageType | string) => void;
}) => {
  const {data: user} = useUser();
  const [channel, setChannel] = useState<PusherTypes.Channel>();

  const deregisterPusher = () => {
    channel?.unsubscribe();
    setChannel(undefined);
  };

  const registerPusher = ({userSession}: {userSession: UserSession}) => {
    deregisterPusher();

    const pusher = new Pusher(process.env.REACT_APP_PUSHER_KEY || '', {
      cluster: 'eu',
      authEndpoint: `${process.env.REACT_APP_API_URL}/api/auth/pusher`,
      auth: {
        headers: {
          Authorization: `Bearer ${userSession.token}`,
        },
      },
    });

    const subscribedChannel = pusher.subscribe(
      `private-${user?.userData.propertyOwner.id}`,
    );
    subscribedChannel.bind_global((event: MessageType | string) => {
      if (event === 'pusher:subscription_succeeded') {
        return;
      }
      onMessageReceived(event);
    });

    setChannel(subscribedChannel);
  };

  useEffect(() => {
    const userSession = getStoredUser();
    if (userSession && user) {
      registerPusher({userSession});
    } else {
      deregisterPusher();
    }

    return () => {
      deregisterPusher();
    };
  }, [user]);
};
