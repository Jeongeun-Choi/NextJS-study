import { NextApiRequest, NextApiResponse } from "next";

const mockComments = [
  { id: 1, email: "cje3080@gmail.com", name: "정은", comment: "좋은 글이네요" },
  { id: 2, email: "wjddms3080@hanmail.net", name: "은정", comment: "퍼가요~" },
];
const handleGetComments = (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json({ comments: mockComments });
};

export default handleGetComments;
