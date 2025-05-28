import { MyLists } from "@/components";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { getQueryClient } from "@/query-api/get-query-client";
import { listsQueryOptions } from "@/query-api/query-options";

export default async function ListsPage() {
  // First render, prefetch on serverside
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery( listsQueryOptions() );

  return (
    <div className="page-container">
      <HydrationBoundary state={dehydrate( queryClient )}>
        <MyLists />
      </HydrationBoundary>
    </div>
  );
}