import Link from 'next/link';
import { useEffect, useCallback, useState } from 'react';
import { getFeaturedEvents } from '../dummy-data';
import { FeaturedEvent } from './types';

function HomePage() {
  const [featuredEvents, setFeaturedEvents] = useState<FeaturedEvent[]>([]);

  const getEvents = useCallback(() => {
    const featuredList = getFeaturedEvents();

    setFeaturedEvents(featuredList);
  }, []);

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <div>
      <ul>
        {featuredEvents.map(data => (
          <li key={data.id}>
            <Link href={`/events/${data.id}`}>{data.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HomePage;
