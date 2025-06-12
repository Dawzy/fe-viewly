"use client"

import { browseQueryOptions } from "@/query-api/query-options";
import MovieBannerCarousel from "./movie-banner-carousel";
import { BROWSE_CATEGORIES } from "@/constants";

const CategoryCarousels = () => {
  return (
    <>
      {BROWSE_CATEGORIES.map(category => (
        <MovieBannerCarousel
          key={category.name}
          title={category.name}
          queryOptions={
            browseQueryOptions({
              category: category.name.toLowerCase(),
              page: category.page
            })
          }
        />
      ))}
    </>
  )
}
export default CategoryCarousels;