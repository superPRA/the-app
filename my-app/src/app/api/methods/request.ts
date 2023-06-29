export async function getBd(request: Request) {
  return await request
    .json()
    .then((res) => res)
    .catch((err) => {});
}

export function getQuery(request: Request, queries: string[] | string) {
    if (typeof queries === "string")
      return new URLSearchParams(new URL(request.url).search).get(queries);
  
    return queries
      .map((q) => {
        return {
          [q]: new URLSearchParams(new URL(request.url).search).get(q),
        };
      })
      .reduce((prev, current, index, arr) => {
        return {
          ...prev,
          ...current,
        };
      }, {});
  }