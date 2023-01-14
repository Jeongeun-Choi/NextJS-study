import Link from "next/link";
import { useEffect, useCallback, useState } from "react";
import { getFeaturedEvents } from "../dummy-data";
import { FeaturedEvent } from "./types";
import EventList from "../components/events/EventList";

import fs from "fs/promises"; // React 앱 코드가 준비됐을때 NextJS 측에선 해당 코드를 삭제한다.
import path from "path";

function HomePage(props) {
  // const [featuredEvents, setFeaturedEvents] = useState<FeaturedEvent[]>([]);

  // const getEvents = useCallback(() => {
  //   const featuredList = getFeaturedEvents();

  //   setFeaturedEvents(featuredList);
  // }, []);

  // useEffect(() => {
  //   getEvents();
  // }, []);

  const { products } = props;

  return (
    // <div>
    //   <EventList items={featuredEvents} />
    // </div>
    <ul>
      {products.map((product) => (
        <li key={product.id}>
          <Link href={`/products/${product.id}`}>{product.title}</Link>
        </li>
      ))}
    </ul>
  );
}

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);
  return {
    props: {
      products: data.products,
    },
    revalidate: 600,
  };
}

export default HomePage;
