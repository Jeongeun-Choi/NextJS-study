import Link from 'next/link';
import { useEffect, useCallback, useState } from 'react';
import { getFeaturedEvents } from '../dummy-data';
import { FeaturedEvent } from './types';
import EventList from '../components/events/EventList';

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
      {products.map(product => (
        <li key={product.id}>{product.title}</li>
      ))}
    </ul>
  );
}

export async function getStaticProps() {
  return {
    props: {
      products: [{ id: 'p1', title: 'Product 1' }]
    }
  };
}

export default HomePage;
