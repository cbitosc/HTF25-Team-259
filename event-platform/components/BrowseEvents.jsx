import React, { useState } from "react";
import { QRCode } from "qrcode.react";

const eventsList = [
  { id: 1, name: "Tech Summit 2025" },
  { id: 2, name: "Gaming Expo" },
  { id: 3, name: "Music Fest" },
];

export default function BrowseEvents() {
  const [myEvents, setMyEvents] = useState([]);

  const registerEvent = (event) => {
    // Create a fake registration ID
    const registrationId = `${event.id}-${Date.now()}`;
    
    // Add event to "My Events"
    setMyEvents([...myEvents, { ...event, registrationId }]);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Browse Events</h2>
      {eventsList.map((ev) => (
        <div key={ev.id} style={{ marginBottom: "10px" }}>
          <strong>{ev.name}</strong>
          <button
            onClick={() => registerEvent(ev)}
            style={{ marginLeft: "10px" }}
          >
            Register
          </button>
        </div>
      ))}

      <h2 style={{ marginTop: "40px" }}>My Events</h2>
      {myEvents.map((ev) => (
        <div key={ev.registrationId} style={{ marginTop: "20px" }}>
          <h3>{ev.name}</h3>
          <QRCode value={`https://yourapp.com/my-events/${ev.registrationId}`} />
        </div>
      ))}
    </div>
  );
}
