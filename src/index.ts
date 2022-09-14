import dotenv from "dotenv";
dotenv.config();
import bs58check from "bs58check";
import cors from "cors";
import { Deso } from "deso-protocol";
import express from "express";

export interface Commit {
  id: string;
  tree_id: string;
  distinct: boolean;
  message: string;
  timestamp: Date;
  url: string;
  author: { name: string };
  committer: any[];
  added: any[];
  removed: any[];
  modified: any[];
}
export interface Owner {
  name: string;
  email?: any;
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
}

export interface Repository {
  id: number;
  node_id: string;
  name: string;
  full_name: string;
  private: boolean;
  owner: Owner;
}
const deso = new Deso({ identityConfig: { host: "server" } });
const app = express();
app.use(express.json());
app.use(cors());

const PORT: Readonly<number> = 3000;

app.get("/", async (req, res) => {
  res.send("hello");
});

app.get("/core", async (req, res) => {
  const postMessage = constructPostMessage(req);
  signAndSubmit(postMessage);
});

app.get("/backend", async (req, res) => {
  const postMessage = constructPostMessage(req);
  signAndSubmit(postMessage);
});

app.post("/deso-workspace", async (req, res) => {
  const postMessage = constructPostMessage(req);
  signAndSubmit(postMessage);
});

app.listen(PORT, async () => {});

const constructPostMessage = (req: { body: any }): string => {
  const commits: Commit[] = req.body?.commits;
  const repo: Repository = req.body?.repository;
  if (commits.length > 0) {
    try {
      const message = [
        `${commits[0].author.name} Pushed to ${repo.name.toString()} \n`,
        "  Commits: \n",
        ...commits.map((commit) => {
          return `    ${commit.author.name}: ${commit.message} ✅`;
        }),
      ]
        .join("\n")
        .toString();
      return message;
    } catch (e) {
      // console.log(e);
      throw Error("construction of post failed");
    }
  }
};
const signAndSubmit = async (postMessage: string): Promise<any> => {
  const keyPair = deso.utils.generateKeyFromSource({
    mnemonic: process.env.MNEMONIC,
  });
  const UpdaterPublicKeyBase58Check =
    deso.utils.privateKeyToDeSoPublicKey(keyPair);

  const post = await deso.posts.submitPost({
    UpdaterPublicKeyBase58Check,
    BodyObj: {
      Body: postMessage,
      ImageURLs: [],
      VideoURLs: [],
    },
  });

  post.constructedTransactionResponse.TransactionHex;

  const signedTransactionHex = await deso.utils.signMessageLocally({
    keyPair,
    transactionHex: post.constructedTransactionResponse.TransactionHex,
  });
  const response = await deso.transaction.submitTransaction(
    signedTransactionHex
  );
  return response;
  // return response;
};
