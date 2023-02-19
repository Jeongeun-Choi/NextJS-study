import { NextApiRequest, NextApiResponse } from "next";

const handleRegistEmail = (req: NextApiRequest, res: NextApiResponse) => {
  const email = req.body.email;

  res.status(200).json({ email });
};

export default handleRegistEmail;
