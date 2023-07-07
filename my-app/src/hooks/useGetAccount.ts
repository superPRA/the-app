import { apiSuccessResponse } from "@/app/api/accounts/loadData/route";
import { useAppDispatch } from "@/redux/hooks";
import { actions } from "@/redux/slices/masterSlice";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

type Props = {
  holdQueryActions?: boolean;
};

// extract the type of the account property
type accountType = NonNullable<apiSuccessResponse["account"]>;

export const useGetAccount = (config?: Props) => {
  const dispatch = useAppDispatch();
  const queryclient = useQueryClient();
  const token =
    (typeof localStorage !== "undefined" && localStorage.getItem("token")) ||
    queryclient.getQueryData<string | null>(["token"]);
  return useQuery({
    queryKey: ["account"],
    queryFn: async () => {
      const data = await axios({
        url: `/api/accounts/loadData?token=${token}`,
        method: "get",
      })
        .then((res) => res.data.account)
        .catch((err) => {
          dispatch(
            actions.setMassage({
              message: err.response.data.err,
              type: "error",
            })
          );
        });

      return data as accountType;
    },
    enabled: !!token && !config?.holdQueryActions,
  });
};
