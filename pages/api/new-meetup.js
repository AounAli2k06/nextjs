import { MongoClient } from "mongodb";

 async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body

    const client = await MongoClient.connect(
      "mongodb+srv://aounali2k06:lgUCEkpZJq4aI2Zb@cluster0.epuraxt.mongodb.net/meetups?retryWrites=true&w=majority"
    );
    const db = client.db();

    const meetupsCollections = db.collection("meetups");

    const result = await meetupsCollections.insertOne(data);

    console.log(result);

    res.status(201).json({ message: "meetup inserted" });
  }
}

export default handler
