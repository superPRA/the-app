import axios, { Method } from "axios";

export default async function dataProvider({
  url,
  method,
  body,
  params,
}: Props) {
  const baseURL = "http://localhost/3000/api";
  return await axios({
    baseURL,
    url,
    method,
    data: body,
    params,
  })
    .then((res) => res.data)
    .catch((err) => {
      console.log(err);
      return err;
    });
}

export type Props = {
  url: string;
  method: Method;
  body?: Object;
  params?: any;
};
