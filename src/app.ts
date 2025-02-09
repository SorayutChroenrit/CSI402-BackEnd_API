import express, { Request, Response } from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());

interface ReqBody {
  studentId: string;
  amount: number;
}
app.post(
  "/SPU/calculatePoints",
  (req: Request<{}, {}, ReqBody>, res: Response) => {
    try {
      let totalPoints = 1000;
      const { studentId, amount } = req.body;

      if (!studentId || !amount) {
        return res.status(400).json({
          code: "Error-0001-02",
          status: "400",
          message: "Missing or invalid field.",
        });
      }

      if (amount <= 0) {
        return res.status(400).json({
          code: "Error-0001-02",
          status: "400",
          message: "amount must have more than 0",
        });
      }

      const pointsEarned = Math.floor(amount / 100) * 10;

      totalPoints = totalPoints + pointsEarned;

      const response = {
        code: "Success-01-0001",
        status: "Status",
        msg: "Successfully Calculate",
        data: {
          studentId: studentId,
          pointsEarned: pointsEarned,
          totalPoints: totalPoints,
        },
      };
      res.send(response);
    } catch (error) {
      const response = {
        code: "Error-01-0001",
        status: 400,
        msg: error,
      };
      res.send(response);
    }
  }
);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
