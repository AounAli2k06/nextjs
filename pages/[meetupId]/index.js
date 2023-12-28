import MeetupDetail from "@/components/meetups/MeetupDetail";
import { MongoClient, ObjectId } from "mongodb";
import React from "react";

const MeetupDetailsPage = ({ meetupData }) => {
  return (
    <MeetupDetail
      image={meetupData.image}
      address={meetupData.address}
      title={meetupData.title}
      description={meetupData.description}
    />
  );
};

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://aounali2k06:lgUCEkpZJq4aI2Zb@cluster0.epuraxt.mongodb.net/meetups?retryWrites=true&w=majority"
  );

  const db = client.db();

  const meetupsCollections = db.collection("meetups");

  const meetups = await meetupsCollections.find({}, { _id: 1 }).toArray();

  client.close();

  return {
    fallback: false,
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;

  console.log(meetupId);

  const client = await MongoClient.connect(
    "mongodb+srv://aounali2k06:lgUCEkpZJq4aI2Zb@cluster0.epuraxt.mongodb.net/meetups?retryWrites=true&w=majority"
  );

  const db = client.db();

  const meetupsCollections = db.collection("meetups");

  const meetupData = await meetupsCollections.findOne({
    _id: new ObjectId(meetupId),
  });

  if (!meetupData) {
    console.log("could not find");
  }
  return {
    props: {
      meetupData: {
        title: meetupData.title,
        address: meetupData.address,
        image: meetupData.image,
        id: meetupData._id.toString(),
      },
    },
  };
}

export default MeetupDetailsPage;
