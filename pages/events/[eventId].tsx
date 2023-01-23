import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { useState } from "react";
import { FeaturedEvent } from "../types";
import EventSummary from "../../components/event-detail/event-summary";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";
import ErrorAlert from "../../components/ui/ErrorAlert";
import { getEventById } from "../../helpers/app-utils";

const initDetail = {
  id: "",
  title: "",
  description: "",
  location: "",
  date: "",
  image: "",
  isFeatured: false,
};
const EventDetailPage = (props: { eventDetail: FeaturedEvent }) => {
  const [eventDetail, setEventDetail] = useState<FeaturedEvent>(
    props.eventDetail
  );
  const router = useRouter();

  if (!eventDetail) {
    return (
      <ErrorAlert>
        <p>No event found!</p>
      </ErrorAlert>
    );
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

export async function getServerSideProps(context: {
  params: { eventId: string };
}) {
  const { params } = context;

  const { eventId } = params;

  const data = await getEventById(eventId);

  return { props: { eventDetail: data[eventId] } };
}
