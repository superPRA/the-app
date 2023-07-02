import axios from "axios";
import getQueryClient from "./getQueryClient";
import { Hydrate, dehydrate } from "@tanstack/react-query";

type Props = {
  children: JSX.Element;
};

export default async function PrefetchProvider({ children }: Props) {   
  const queryClient = getQueryClient();
  
  const dehydratedState = dehydrate(queryClient);
  return <Hydrate state={dehydratedState}>{children}</Hydrate>;
}
