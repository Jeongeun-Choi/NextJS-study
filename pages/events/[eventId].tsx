import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { getEventById } from '../../dummy-data';
import { useState } from 'react';
import { FeaturedEvent } from '../types';

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

  return (
    <>
      <div>이벤트 아이디 : {eventId}</div>
      <div>이벤트 이름 : {eventDetail.title}</div>
    </>
  );
};

export default EventDetailPage;
