import { NextApiRequest, NextApiResponse } from "next";
import { connect, getDocument } from "../../../helpers/db-utils";

const handleGetComments = async (req: NextApiRequest, res: NextApiResponse) => {
  const eventId = req.query.eventId;

  let client;

  try {
    client = await connect("events");
  } catch (e) {
    res.status(500).json({ message: "Connecting to the database failed!" });
    return;
  }

  try {
    const documents = await getDocument(
      client,
      "comments",
      { _id: 1 },
      { eventId }
    );
    client.close();
    res.status(200).json({ comments: documents });
  } catch (e) {
    res.status(500).json({ message: "Inserting data failed!" });
  }
};

export default handleGetComments;
