import React, { useEffect, useCallback, useState } from 'react';
import { useRouter } from 'next/router';
import { getFilteredEvents } from '../../dummy-data';
import { FeaturedEvent } from '../types';

const FilteredEventsPage = () => {
  const [filteredEvents, setFilteredEvents] = useState<FeaturedEvent[]>([]);

  const router = useRouter();

  const { date } = router.query;

  // const getEvents = useCallback(() => {
  //   console.log(router.query);
  //   const dateFilter = { year: date[0], month: date[1] };
  //   const filteredEventList = getFilteredEvents(dateFilter);
  //   setFilteredEvents(filteredEventList);
  // }, []);

  useEffect(() => {
    // getEvents();
  }, []);

  return (
    <div>
      <ul>
        {filteredEvents.map(event => (
          <li key={event.id}>{event.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default FilteredEventsPage;
