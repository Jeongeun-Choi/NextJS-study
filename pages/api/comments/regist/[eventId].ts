import { NextApiRequest, NextApiResponse } from "next";

const handleRegistComment = (req: NextApiRequest, res: NextApiResponse) => {
  const params = req.body.params;
  const eventId = req.query.eventId;

  res.status(200).json({ params, eventId });
};

export default handleRegistComment;
