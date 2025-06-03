import { getQueryClient } from "@/query-api/get-query-client";
import { MyMovies } from "@/components";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { fetchListById } from "@/utils/common-server-actions";
import { LISTS_QUERY_KEY } from "@/constants";

const ListItemsPage = async ({
  params
}: {
  params: Promise<{ id: string }>
}) => {
  const { id } = await params;

  // First render, prefetch on serverside
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: [LISTS_QUERY_KEY],
    queryFn: () => fetchListById(id)
  });

  return (
    <div className="page-container">
      <HydrationBoundary state={dehydrate( queryClient )}>
        <MyMovies listId={id} />
      </HydrationBoundary>
    </div>
  )
}

export default ListItemsPage;