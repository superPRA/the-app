import axios from "axios";
import {
  GetStaticPaths,
  GetStaticPathsContext,
  GetStaticPathsResult,
} from "next";

export default function UserName(a: any) {
  return <div>awd</div>;
}

async function getStaticPaths(context: GetStaticPathsContext) {
  const usernames: string[] = await axios
    .get("http://localhost:3000/api/accounts/getAllUsernames")
    .then((res) => res.data.usernames);
  return {
    paths: usernames.map((item) => {
      return {
        params: {
          username: item,
        },
      };
    }),
    fallback: false,
  };
}
