import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Client, Databases } from "appwrite";

function Cal() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const client = new Client();

        client
          .setEndpoint(process.env.REACT_APP_API_ENDPOINT)
          .setProject(process.env.REACT_APP_PROJECT_ID);

        const database = new Databases(client);

        const response = await database.listDocuments(
          process.env.REACT_APP_DATABASE_ID,
          process.env.REACT_APP_EVENTS_COLLECTION_ID
        );

        console.log("Fetched events:", response.documents);

        const transformedEvents = response.documents.map(event => ({
          title: event.title,
          start: event.startDate.substring(0, 10),
          description: event.usernamee,
          category: event.category,
          // Add more fields as needed
        }));

        console.log('Transformed events:', transformedEvents);
        setEvents(transformedEvents);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  // Function to customize event content
  const renderEventContent = (eventInfo) => {
    return (
      <div className="event-content" style={{ whiteSpace: "normal", overflowWrap: "break-word"}}>
        <p className="event-title">{eventInfo.event.title}</p>
        <p className="event-details">{eventInfo.event.extendedProps.description}</p>
        <p className="event-category">{eventInfo.event.extendedProps.category}</p>
      </div>
    );
  };

  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        eventContent={renderEventContent}
      />
    </div>
  );
}

export default Cal;
