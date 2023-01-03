import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { getEventById } from '../../dummy-data';
import { useState } from 'react';
import { FeaturedEvent } from '../types';
import EventSummary from '../../components/event-detail/event-summary';
import EventLogistics from '../../components/event-detail/event-logistics';
import EventContent from '../../components/event-detail/event-content';

const initDetail = {
  id: '',
  title: '',
  description: '',
  location: '',
  date: '',
  image: '',
  isFeatured: false
};
const EventDetailPage = () => {
  const [eventDetail, setEventDetail] = useState<FeaturedEvent>(initDetail);
  const router = useRouter();

  const { eventId } = router.query;

  const getEventDetail = useCallback(() => {
    const detail = getEventById(eventId);

    setEventDetail(detail as FeaturedEvent);
  }, []);

  useEffect(() => {
    getEventDetail();
  }, []);

  if (!eventDetail) {
    return <p>No event found!</p>;
  }

  return (
    <>
      <EventSummary title={eventDetail.title} />
      <EventLogistics
        date={eventDetail.date}
        address={eventDetail.location}
        image={eventDetail.image}
        imageAlt={eventDetail.title}
      />
      <EventContent>
        <p>{eventDetail.description}</p>
      </EventContent>
    </>
  );
};

export default EventDetailPage;
