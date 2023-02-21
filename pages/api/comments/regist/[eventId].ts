import { NextApiRequest, NextApiResponse } from "next";
import { connect, insertDocument } from "../../../../helpers/db-utils";

const handleRegistComment = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const params = req.body.params;
  const eventId = req.query.eventId;

  const newComment = {
    email: params.email,
    name: params.name,
    text: params.text,
    eventId,
  };
  let client;

  try {
    client = await connect("events");
  } catch (e) {
    res.status(500).json({ message: "Connecting to the database failed!" });
    return;
  }

  try {
    await insertDocument(client, "comments", newComment);
    client.close();
    res.status(200).json({ params, eventId });
  } catch (e) {
    res.status(500).json({ message: "Inserting data failed!" });
  }
};

export default handleRegistComment;
