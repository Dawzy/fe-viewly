import { getQueryClient } from "@/query-api/get-query-client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { CategoryCarousels, MoviesSearchGroup } from "@/components";
import { fetchMoviesByCategory } from "@/utils/common-server-actions";
import { BROWSE_CATEGORIES, BROWSE_QUERY_KEY } from "@/constants";
import { tryCatch } from "@/utils/tryCatch";

const BrowsePage = async () => {
  // First render, prefetch on serverside
  const queryClient = getQueryClient();

  await Promise.all(
    BROWSE_CATEGORIES.map(async (category) => {
      const payload = { category: category.name.toLowerCase(), page: category.page }
      
      return tryCatch(queryClient.prefetchQuery({
          queryKey: [BROWSE_QUERY_KEY, payload],
          queryFn: () => fetchMoviesByCategory(payload)
        })
      );
    })
  );

  return (
    <div className="page-container">
      <div className="page flex-col items-center w-full px-4 py-4 gap-6">
        <HydrationBoundary state={dehydrate(queryClient)}>
          <MoviesSearchGroup />
          <CategoryCarousels />
        </HydrationBoundary>
      </div>
    </div>
  )
}

export default BrowsePage;