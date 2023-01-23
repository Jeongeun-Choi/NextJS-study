import React, { useState } from "react";
import { FeaturedEvent } from "../types";
import { useRouter } from "next/router";
import EventList from "../../components/events/EventList";
import EventSearch from "../../components/events/EventSearch";
import { getAllEvents } from "../../helpers/app-utils";

const EventsPage = (props: { allEvents: FeaturedEvent[] }) => {
  const router = useRouter();
  const [allEvents, setAllEvents] = useState<FeaturedEvent[]>(props.allEvents);

  const findEventsHandler = (year: string, month: string) => {
    const fullPath = `/events/${year}/${month}`;

    router.push(fullPath);
  };

  return (
    <div>
      <EventSearch onSearch={findEventsHandler} />
      <EventList items={allEvents} />
    </div>
  );
};

export default EventsPage;

export async function getStaticProps() {
  const transformedData = await getAllEvents();

  return {
    props: {
      allEvents: transformedData,
    },
    revalidate: 60,
  };
}
