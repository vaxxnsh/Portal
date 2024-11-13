"use client";
import * as React from 'react';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';

function randomID(len: number): string {
  let result = '';
  const chars = '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP';
  const maxPos = chars.length;
  for (let i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return result;
}

export function getUrlParams(url = window.location.href): URLSearchParams {
  let urlStr = url.split('?')[1];
  return new URLSearchParams(urlStr);
}

export default function App() {
  const [roomID, setRoomID] = React.useState<string | null>(null);

  React.useEffect(() => {
    // Get room ID from URL or generate one if not found
    const id = getUrlParams().get('iD') || randomID(5);
    setRoomID(id);

    // Ensure we join the room once the component is mounted
    if (id) {
      const appID: number = Number(process.env.NEXT_PUBLIC_ZEGOCLOUD_APP_ID);
      const serverSecret: string = String(process.env.NEXT_PUBLIC_ZEGOCLOUD_SERVER_SECRET);
      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, id, randomID(5), randomID(5));

      const zp = ZegoUIKitPrebuilt.create(kitToken);
      zp.joinRoom({
        container: document.getElementById('myCallContainer'), // use ID to reference the container
        sharedLinks: [
          {
            name: 'Personal link',
            url: `${window.location.protocol}//${window.location.host}${window.location.pathname}?roomID=${id}`,
          },
        ],
        scenario: {
          mode: ZegoUIKitPrebuilt.OneONoneCall, // For 1-on-1 calls
        },
      });
    }
  }, []); // Empty dependency array ensures it runs once when the component mounts

  return (
    <div
      id="myCallContainer" // Use id to target the container element
      style={{ width: '100vw', height: '100vh' }}
    />
  );
}
