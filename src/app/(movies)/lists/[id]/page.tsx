import { getQueryClient } from "@/query-api/get-query-client";
import { listQueryOptions } from "@/query-api/query-options";
import { MyMovies } from "@/components";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

const ListItemsPage = async ({
  params
}: {
  params: Promise<{ id: string }>
}) => {
  const { id } = await params;

  // First render, prefetch on serverside
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery( listQueryOptions(id) );

  return (
    <div className="page-container">
      <HydrationBoundary state={dehydrate( queryClient )}>
        <MyMovies listId={id} />
      </HydrationBoundary>
    </div>
  )
}

export default ListItemsPage;