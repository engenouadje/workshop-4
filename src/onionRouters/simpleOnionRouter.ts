import bodyParser from "body-parser";
import express, { Request, Response } from "express";
import { BASE_ONION_ROUTER_PORT ,REGISTRY_PORT} from "../config";

import { importPubKey, generateRsaKeyPair, exportPrvKey, exportPubKey } from "../crypto";

let lastReceivedEncryptedMessage: string | null = null;
let lastReceivedDecryptedMessage: string | null = null;
let lastMessageDestination: string | null = null;

export async function simpleOnionRouter(nodeId: number) {
  const onionRouter = express();
  onionRouter.use(express.json());
  onionRouter.use(bodyParser.json());

  onionRouter.get("/status", (req, res) => {
    res.send("live");
  });

 

  
  // Generate RSA key pair on startup
  let _privateKey: string | null = null;
  let _publicKey: string | null = null;
  try {
    const { privateKey, publicKey } = await generateRsaKeyPair();
    _privateKey = await exportPrvKey(privateKey);
    _publicKey = await exportPubKey(publicKey);
  } catch (error) {
    console.error("Error generating RSA key pair:", error);
    process.exit(1); // Exit with an error code if key generation fails
  }
  
  // Register the node on the registry
  try {
    const response = await fetch(`http://localhost:${REGISTRY_PORT}/registerNode`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nodeId: nodeId.toString(), pubKey: _publicKey }),
    });
  
    const data = await response.json();
    console.log("Node registration response:", data);
  } catch (error) {
    console.error("Error registering node:", error);
  }


   // Route to get the last received encrypted message
   onionRouter.get("/getLastReceivedEncryptedMessage", (req, res) => {
    res.json({ result: lastReceivedEncryptedMessage });
  });

  // Route to get the last received decrypted message
  onionRouter.get("/getLastReceivedDecryptedMessage", (req, res) => {
    res.json({ result: lastReceivedDecryptedMessage });
  });

  // Route to get the last message destination
  onionRouter.get("/getLastMessageDestination", (req, res) => {
    res.json({ result: lastMessageDestination });
  });
    

  const server = onionRouter.listen(BASE_ONION_ROUTER_PORT + nodeId, () => {
    console.log(
      `Onion router ${nodeId} is listening on port ${
        BASE_ONION_ROUTER_PORT + nodeId
      }`
    );
  });

  return server;
}

