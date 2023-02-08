import Head from "next/head";
import { useState } from "react";
import { FeaturedEvent } from "./types";
import EventList from "../components/events/EventList";
import { getFeaturedEvents } from "../helpers/app-utils";

function HomePage(props: { featuredData: FeaturedEvent[] }) {
  const [featuredEvents, setFeaturedEvents] = useState<FeaturedEvent[]>(
    props.featuredData
  );

  return (
    <div>
      <Head>
        <title>NextJS Events</title>
        <meta name="description" content="I study NextJS :)"></meta>
      </Head>
      <EventList items={featuredEvents} />
    </div>
  );
}

export default HomePage;

export async function getServerSideProps() {
  const featuredData = await getFeaturedEvents();

  return {
    props: { featuredData },
    // revalidate: 1800,
  };
}
