"use client";

import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { MoviesProps } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { listQueryOptions } from "@/query-api/query-options";
import {
  MovieCard,
  Spinner,
  PageHeader
} from "@/components";

const MyMovies = ({ listId }: MoviesProps) => {
  const {
    data,
    isLoading,
    isError
  } = useQuery( listQueryOptions(listId) );

  if (isLoading) return (
    <div className="page w-full px-4 py-4 gap-6 flex-wrap justify-center items-center h-auto">
      <Spinner />
    </div>
  );
  
  if (isError || !data) return (
    <div className="page w-full px-4 py-4 gap-6 flex-wrap justify-center items-center h-auto text-2xl">
      <p>Error loading movies, please try again later.</p>
    </div>
  );

  return (
    <>
      {/* Page Header */}
      <PageHeader
        title={data.name}
        options={[
          { optionName: "Rename List", onClick: () => {}, isDestructive: false },
          { optionName: "Delete List", onClick: () => {}, isDestructive: true  }
        ]}
        onAdd={() => {}}
      />

      {/* Page Content */}
      <div className="page w-full px-4 py-4 gap-6 flex-wrap">
        {data.movies.map(movie =>
          <MovieCard key={movie.id} movie={movie} />
        )}

        {/* Add movie button */}
        <Button className="flex justify-center items-center w-[122px] h-[162px] bg-on-surface rounded-2xl hover:bg-background">
          <Plus className="text-primary !h-12 !w-12" />
        </Button>
      </div>
    </>
  )
}
export default MyMovies;