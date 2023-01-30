import React from "react";
import { FeaturedEvent } from "../../pages/types";
import DateIcon from "../icons/date-icon";
import AddressIcon from "../icons/address-icon";
import ArrowRightIcon from "../icons/arrow-right-icon";
import classes from "./event-item.module.css";
import Button from "../ui/button";

const EventItem = ({ item }: { item: FeaturedEvent }) => {
  const hymanReadableDate = new Date(item.date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const formattedAddress = item?.location.replace(", ", "\n");
  const exploreLink = `/events/${item.id}`;
  return (
    <li className={classes.item}>
      <img src={`/${item?.image}`} alt={item?.title} />
      <div className={classes.content}>
        <div className={classes.summary}>
          <h2>{item?.title}</h2>
          <div className={classes.date}>
            <DateIcon />
            <time>{hymanReadableDate}</time>
          </div>
          <div className={classes.address}>
            <AddressIcon />
            <address>{formattedAddress}</address>
          </div>
        </div>
        <div className={classes.actions}>
          <Button link={exploreLink}>
            <span>Explore Event</span>
            <span className={classes.icon}>
              <ArrowRightIcon />
            </span>
          </Button>
        </div>
      </div>
    </li>
  );
};

export default EventItem;
