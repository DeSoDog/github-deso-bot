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
const getSinglePost = async () => {
  const postData = await deso.posts.getSinglePost({
    PostHashHex:
      "d30d715dfdc59955ae239635833367dd6c367bb52771bc47f507ccfb4060d53a",
  });
  return postData;
};
const app = express();
app.use(express.json());
app.use(cors());

const PORT: Readonly<number> = 3000;

app.get("/", async (req, res) => {
  res.send("hello");
});

app.get("/core", async (req, res) => {});

app.get("/backend", async (req, res) => {});
app.post("/deso-workspace", async (req, res) => {
const postMessage = constructPostMessage(req)
      const keyPair = deso.utils.generateKeyFromSource({
        mnemonic:
          "horn ripple stadium gallery wolf vast doll race blanket modify palm into",
      });

      const post = await deso.posts.submitPost({
        UpdaterPublicKeyBase58Check:
          "BC1YLfiECJp52WjUGtdqo7rUxpWnYfqyxwL1CDRyDv2wddMxA1E4RtK",
      });
      post.constructedTransactionResponse.TransactionHex;

      const signedTransactionHex = await deso.utils.signMessageLocally({
        keyPair,
        transactionHex: post.constructedTransactionResponse.TransactionHex,
      });

      deso.identity.submitTransaction(signedTransactionHex);
  }
});

app.listen(PORT, async () => {
  const keyPair = deso.utils.generateKeyFromSource({
    mnemonic:
      "horn ripple stadium gallery wolf vast doll race blanket modify palm into",
  });
  console.log(keyPair);

  const post = await deso.posts.submitPost({
    UpdaterPublicKeyBase58Check:
      "BC1YLfiECJp52WjUGtdqo7rUxpWnYfqyxwL1CDRyDv2wddMxA1E4RtK",
  });
  post.constructedTransactionResponse.TransactionHex;

  const signedTransactionHex = await deso.utils.signMessageLocally({
    keyPair,
    transactionHex: post.constructedTransactionResponse.TransactionHex,
  });

  deso.identity.submitTransaction(signedTransactionHex);
  console.log("listening on port 3000");
});

// helpers

const constructPostMessage = (req: {body: any}):string  =>{
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
        return message
    } catch (e) {
      console.log(e);
      throw Error("construction of post failed");
    }}

}