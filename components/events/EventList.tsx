import React from 'react';
import EventItem from './EventItem';
import { FeaturedEvent } from '../../pages/types';
import classes from './event-list.module.css';

const EventList = ({ items }: { items: FeaturedEvent[] }) => {
  return (
    <ul className={classes.list}>
      {items.map((item: FeaturedEvent) => (
        <EventItem key={item.id} item={item} />
      ))}
    </ul>
  );
};

export default EventList;
