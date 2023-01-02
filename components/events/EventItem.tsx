import React from 'react';
import { FeaturedEvent } from '../../pages/types';
import Link from 'next/link';
import classes from './event-item.module.css';

const EventItem = ({ item }: { item: FeaturedEvent }) => {
  const hymanReadableDate = new Date(item.date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const formattedAddress = item.location.replace(', ', '\n');
  const exploreLink = `/events/${item.id}`;
  return (
    <li className={classes.item}>
      <img src={`/${item.image}`} alt={item.title} />
      <div className={classes.content}>
        <div className={classes.summary}>
          <h2>{item.title}</h2>
          <div className={classes.date}>
            <time>{hymanReadableDate}</time>
          </div>
          <div className={classes.address}>
            <address>{formattedAddress}</address>
          </div>
        </div>
        <div className={classes.actions}>
          <Link href={exploreLink}>Explore Event</Link>
        </div>
      </div>
    </li>
  );
};

export default EventItem;
