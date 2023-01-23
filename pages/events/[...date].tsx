import React, { useEffect, useCallback, useState } from "react";
import { useRouter } from "next/router";
import EventList from "../../components/events/EventList";
import ResultsTitle from "../../components/events/ResultsTitle";
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/ui/ErrorAlert";
import { getFilteredEvents } from "../../helpers/app-utils";

type FilteredEventsPageProps = {
  filteredEventList: any[];
  hasError?: boolean;
  date: {
    year: number;
    month: number;
  };
};
const FilteredEventsPage = ({
  filteredEventList,
  hasError,
  date,
}: FilteredEventsPageProps) => {
  const router = useRouter();

  // const date = router.query.date;

  // if (!date) {
  //   return (
  //     <ErrorAlert>
  //       <p className="center">Loading...</p>
  //     </ErrorAlert>
  //   );
  // }
  if (hasError) {
    return (
      <>
        <ErrorAlert>
          <p>Invalid filter. Please adjust your values!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </>
    );
  }

  if (!filteredEventList || filteredEventList.length === 0) {
    return (
      <>
        <ErrorAlert>
          <p>No events found for the chosen filter!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </>
    );
  }

  const dates = new Date(date.year, date.month - 1);

  return (
    <>
      <ResultsTitle date={dates} />
      <EventList items={filteredEventList} />
    </>
  );
};

export default FilteredEventsPage;

export async function getServerSideProps(context: { params: { date: any[] } }) {
  const { params } = context;

  const { date } = params;

  const filteredYear = date[0];
  const filteredMonth = date[1];

  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12
  ) {
    return {
      props: { hasError: true },
      // nptFound: true,
      // redirect: {
      //   destination : '/error'
      // }
    };
  }

  const dateFilter = {
    year: numYear,
    month: numMonth,
  };

  const data = await getFilteredEvents(dateFilter);

  return {
    props: {
      filteredEventList: data,
      date: {
        year: numYear,
        month: numMonth,
      },
    },
  };
}
