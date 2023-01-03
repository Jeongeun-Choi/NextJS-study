import React, { useEffect, useState } from 'react';
import { FeaturedEvent } from '../types';
import { useCallback } from 'react';
import { getAllEvents } from '../../dummy-data';
import { useRouter } from 'next/router';
import EventList from '../../components/events/EventList';
import EventSearch from '../../components/events/EventSearch';

const EventsPage = () => {
  const router = useRouter();
  const [allEvents, setAllEvents] = useState<FeaturedEvent[]>([]);

  const getEvents = useCallback(() => {
    const events = getAllEvents();
    setAllEvents(events);
  }, []);

  const findEventsHandler = (year: string, month: string) => {
    const fullPath = `/events/${year}/${month}`;

    router.push(fullPath);
  };
  useEffect(() => {
    getEvents();
  }, []);

  return (
    <div>
      <EventSearch onSearch={findEventsHandler} />
      <EventList items={allEvents} />
    </div>
  );
};

export default EventsPage;
