import React from 'react';
import { FeaturedEvent } from '../../pages/types';
import Link from 'next/link';

const EventItem = ({ item }: { item: FeaturedEvent }) => {
  const hymanReadableDate = new Date(item.date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const formattedAddress = item.location.replace(', ', '\n');
  const exploreLink = `/events/${item.id}`;
  return (
    <li>
      <img src={`/${item.image}`} alt={item.title} />
      <div>
        <div>
          <h2>{item.title}</h2>
          <div>
            <time>{hymanReadableDate}</time>
          </div>
          <div>
            <address>{formattedAddress}</address>
          </div>
        </div>
        <div>
          <Link href={exploreLink}>Explore Event</Link>
        </div>
      </div>
    </li>
  );
};

export default EventItem;
