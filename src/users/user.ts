import bodyParser from "body-parser";
import express, { Request, Response } from "express";
import { BASE_USER_PORT } from "../config";

let lastReceivedMessage: string | null = null;
let lastSentMessage: string | null = null;

export async function user(userId: number) {
  const _user = express();
  _user.use(express.json());
  _user.use(bodyParser.json());

  _user.get("/status", (req, res) => {
    res.send("live");
  });

  // Route to receive messages
  _user.post("/message", async (req: Request, res: Response) => {
    const { message }: { message: string } = req.body;

    try {
      // Validate message presence
      if (!message) {
        throw new Error("Missing required field: message");
      }

      // Update last received message
      lastReceivedMessage = message;

      res.send("Message received successfully");
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
        res.status(400).send(error.message);
      } else {
        console.error("Unexpected error type:", error);
        res.status(500).send("Internal server error");
      }
    }
  });

  // Route to get the last received message
  _user.get("/getLastReceivedMessage", (req, res) => {
    res.json({ result: lastReceivedMessage });
  });

  // Route to get the last sent message
  _user.get("/getLastSentMessage", (req, res) => {
    res.json({ result: lastSentMessage });
  });

  const server = _user.listen(BASE_USER_PORT + userId, () => {
    console.log(
      `User ${userId} is listening on port ${BASE_USER_PORT + userId}`
    );
  });

  return server;
}

