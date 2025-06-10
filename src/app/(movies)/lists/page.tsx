import { MyLists } from "@/components";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { getQueryClient } from "@/query-api/get-query-client";
import { LISTS_QUERY_KEY } from "@/constants";
import { fetchLists } from "@/utils/common-server-actions";
import { tryCatch } from "@/utils/tryCatch";

export default async function ListsPage() {
  // First render, prefetch on serverside
  const queryClient = getQueryClient();
  await tryCatch(
    queryClient.prefetchQuery({
      queryKey: [LISTS_QUERY_KEY],
      queryFn: () => fetchLists()
    })
  );

  return (
    <div className="page-container">
      <HydrationBoundary state={dehydrate( queryClient )}>
        <MyLists />
      </HydrationBoundary>
    </div>
  );
}