import { useEffect, useCallback, useState } from "react";
import { getFeaturedEvents } from "../dummy-data";
import { FeaturedEvent } from "./types";
import EventList from "../components/events/EventList";

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
      <EventList items={featuredEvents} />
    </div>
  );
}

export default HomePage;
