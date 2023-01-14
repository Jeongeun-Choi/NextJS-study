import React, { useEffect, useState } from "react";
import useSWR from "swr";
const LastSales = () => {
  const [sales, setSales] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);

  const { data, error, isLoading } = useSWR(
    "https://nextjs-course-e8b27-default-rtdb.firebaseio.com/sales.json"
  );

  useEffect(() => {
    if (data) {
      const transformedArray = [];

      for (const key in data) {
        transformedArray.push({ id: key, ...data[key] });
      }

      console.log(data);
      setSales(transformedArray);
    }
  }, [data]);
  // useEffect(() => {
  //   setIsLoading(true);
  //   fetch("https://nextjs-course-e8b27-default-rtdb.firebaseio.com/sales.json")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       const transformedArray = [];

  //       for (const key in data) {
  //         transformedArray.push({ id: key, ...data[key] });
  //       }

  //       console.log(data);
  //       setSales(transformedArray);
  //     })
  //     .finally(() => {
  //       setIsLoading(false);
  //     });
  // }, []);

  if (!isLoading || !sales) {
    return <p>Loading...</p>;
  }

  return (
    <ul>
      {sales.map((sale) => (
        <li key={sale.id}>
          {sale.username} - {sale.volume}
        </li>
      ))}
    </ul>
  );
};

export default LastSales;
