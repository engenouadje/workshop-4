import bodyParser from "body-parser";
import express, { Request, Response } from "express";
import { REGISTRY_PORT } from "../config";

import {
  importPubKey,
  generateRsaKeyPair,
  exportPrvKey,
  exportPubKey,
} from "../crypto";

export type Node = { nodeId: number; pubKey: string };
export type RegisterNodeBody = { nodeId: number; pubKey: string };
export type GetPrivateKeyPayload = { result: string }; // Base64 encoded private key
export type GetNodeRegistryBody = { nodes: Node[] }; // Registry response format

export async function launchRegistry() {
  const _registry = express();
  _registry.use(express.json());
  _registry.use(bodyParser.json());

  const registeredNodes: Node[] = [];
  let _privateKey: string | null = null; // Store the private key securely
  let nodeIdCounter: number = 1;

  // Generate RSA key pair on startup (optional)
  try {
    const { privateKey, publicKey } = await generateRsaKeyPair();
    _privateKey = await exportPrvKey(privateKey);
    registeredNodes.push({ nodeId: nodeIdCounter++, pubKey: await exportPubKey(publicKey) });
  } catch (error) {
    console.error("Error generating RSA key pair:", error);
    process.exit(1); // Exit with an error code if key generation fails
  }

  _registry.get("/status", (req, res) => {
    res.send("live");
  });

  _registry.post("/registerNode", async (req: Request, res: Response) => {
    const { nodeId, pubKey }: RegisterNodeBody = req.body;

    try {
      // Validate the request body
      if (!nodeId || !pubKey) {
        throw new Error("Missing required fields: nodeId and pubKey");
      }

      // Check if node is already registered
      const existingNode = registeredNodes.find((node) => node.nodeId === nodeId);
      if (existingNode) {
        throw new Error("Node with ID already exists");
      }

      // Import the public key from the string representation
      const publicKey = await importPubKey(pubKey);

      // Add the node to the registry
      registeredNodes.push({ nodeId, pubKey });

      res.send("Node registered successfully");
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

  // Allow retrieval of all registered nodes
  _registry.get("/getNodeRegistry", (req, res) => {
    const responsePayload: GetNodeRegistryBody = { nodes: registeredNodes };
    res.json(responsePayload);
  });


  // Securely store and expose the private key only for authorized testing purposes
  _registry.get("/getPrivateKey", async (req: Request, res: Response) => {
    
   
    if (!_privateKey) {
      return res.status(404).send("Private key not available");
    }
  
    return res.json({ result: _privateKey });
  });
  

  const server = _registry.listen(REGISTRY_PORT, () => {
    console.log(`registry is listening on port ${REGISTRY_PORT}`);
  });

  return server;
}
