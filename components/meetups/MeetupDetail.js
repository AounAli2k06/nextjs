import React from "react";
import classes from './MeetupDetail.module.css'

const MeetupDetail = (props) => {
  return (
    <section className={classes.main}>
      <img src={props.image} alt="Failed to load image" />
      <h1>{props.title}</h1>
      <address>{props.address}</address>
      <p>The meetup description</p>
    </section>
  );
};

export default MeetupDetail;
