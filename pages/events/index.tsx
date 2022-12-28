import React, { useEffect, useState } from 'react';
import { FeaturedEvent } from '../types';
import { useCallback } from 'react';
import { getAllEvents } from '../../dummy-data';
import Link from 'next/link';

const EventsPage = () => {
  const [allEvents, setAllEvents] = useState<FeaturedEvent[]>([]);

  const getEvents = useCallback(() => {
    const events = getAllEvents();
    setAllEvents(events);
  }, []);

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <div>
      <ul>
        {allEvents.map(event => (
          <li key={event.id}>
            <Link href={`/events/${event.id}`}>{event.title} </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventsPage;
