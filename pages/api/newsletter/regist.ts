import { NextApiRequest, NextApiResponse } from "next";
import { connect, insertDocument } from "../../../helpers/db-utils";

const handleRegistEmail = async (req: NextApiRequest, res: NextApiResponse) => {
  const email = req.body.email;
  let client;

  try {
    client = await connect("newsletter");
  } catch (e) {
    res.status(500).json({ message: "Connecting to the database failed!" });
    return;
  }

  try {
    await insertDocument(client, "email", { email });
    client.close();
  } catch (e) {
    res.status(500).json({ message: "Inserting data failed!" });
  }
  res.status(200).json({ email });
};

export default handleRegistEmail;
