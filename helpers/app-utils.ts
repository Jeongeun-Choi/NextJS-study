type DateFilter = {
  year: number;
  month: number;
};

export const getAllEvents = async () => {
  const response = await fetch(
    "https://nextjs-course-1ed28-default-rtdb.firebaseio.com/events.json"
  );

  const data = await response.json();

  const transformedData = [];

  if (!data) {
    return [];
  }

  for (const key in data) {
    transformedData.push({ id: key, ...data[key] });
  }

  return transformedData;
};

export async function getFilteredEvents(dateFilter: DateFilter) {
  const data = await getAllEvents();
  const { year, month } = dateFilter;

  let filteredEvents = data.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });

  return filteredEvents;
}

export async function getEventById(id: string) {
  const data = await getAllEvents();

  return data.find((event) => event.id === id);
}

export async function getFeaturedEvents() {
  const data = await getAllEvents();
  return data.filter((event) => event.isFeatured);
}
