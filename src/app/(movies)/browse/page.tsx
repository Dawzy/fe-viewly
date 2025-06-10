import { getQueryClient } from "@/query-api/get-query-client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { MovieBannerCarousel } from "@/components/";
import { fetchMoviesByCategory } from "@/utils/common-server-actions";
import { BROWSE_QUERY_KEY } from "@/constants";
import { tryCatch } from "@/utils/tryCatch";

const BrowsePage = async () => {
  // First render, prefetch on serverside
  const queryClient = getQueryClient();
  await tryCatch(queryClient.prefetchQuery({
      queryKey: [BROWSE_QUERY_KEY, { category: "trending", page: 1 }],
      queryFn: () => fetchMoviesByCategory({ category: "trending", page: 1 })
    })
  );

  // await tryCatch(queryClient.prefetchQuery({
  //     queryKey: [BROWSE_QUERY_KEY, { category: "action", page: 1 }],
  //     queryFn: () => fetchMoviesByCategory({ category: "action", page: 1 })
  //   })
  // );

  // await tryCatch(queryClient.prefetchQuery({
  //     queryKey: [BROWSE_QUERY_KEY, { category: "comedy", page: 1 }],
  //     queryFn: () => fetchMoviesByCategory({ category: "comedy", page: 1 })
  //   })
  // );

  // await tryCatch(queryClient.prefetchQuery({
  //     queryKey: [BROWSE_QUERY_KEY, { category: "horror", page: 1 }],
  //     queryFn: () => fetchMoviesByCategory({ category: "horror", page: 1 })
  //   })
  // );

  // await tryCatch(queryClient.prefetchQuery({
  //     queryKey: [BROWSE_QUERY_KEY, { category: "thriller", page: 1 }],
  //     queryFn: () => fetchMoviesByCategory({ category: "thriller", page: 1 })
  //   })
  // );

  return (
    <div className="page-container">
      <div className="page flex-col items-center w-full px-4 py-4 gap-6">
        <HydrationBoundary state={dehydrate(queryClient)}>
          <MovieBannerCarousel title="Trending" category="trending" page={1} />
          {/* <MovieBannerCarousel title="Action" category="action" page={1} />
          <MovieBannerCarousel title="Comedy" category="comedy" page={1} />
          <MovieBannerCarousel title="Horror" category="horror" page={1} />
          <MovieBannerCarousel title="Thriller" category="thriller" page={1} /> */}
        </HydrationBoundary>
      </div>
    </div>
  )
}

export default BrowsePage;