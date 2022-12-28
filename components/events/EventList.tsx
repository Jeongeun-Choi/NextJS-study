import React from 'react';
import EventItem from './EventItem';
import { FeaturedEvent } from '../../pages/types';

const EventList = ({ items }: { items: FeaturedEvent[] }) => {
  return (
    <ul>
      {items.map((item: FeaturedEvent) => (
        <EventItem key={item.id} item={item} />
      ))}
    </ul>
  );
};

export default EventList;
