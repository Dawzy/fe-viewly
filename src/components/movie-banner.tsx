"use client";

import { MovieBannerProps } from "@/types";
import { Label } from "@/components/ui/label";
import { useMovieInfoDialog } from "@/contexts/movie-info-dialog-context";
import { useAddMovieMutation } from "@/query-api/mutations";
import { getGenresFromIDs } from "@/utils";
import Image from "next/image";
import { useState } from "react";
import Spinner from "./spinner";

const MovieBanner = ({ movie }: MovieBannerProps) => {
  const { showDialog } = useMovieInfoDialog();
  const { id, genre_ids, overview, poster_path, title, vote_average, backdrop_path } = movie;
  const genres = getGenresFromIDs(genre_ids);
  const [imageLoaded, setImageLoaded] = useState(false);

  const {
    mutate: addMovie,
  } = useAddMovieMutation();

  // Add movie data to list using mutation
  const onAdd = (listId: string) =>
    addMovie({
      listId,
      movieId: id
    });

  const onView = () =>
    showDialog({
      overview,
      poster_path,
      title,
      vote_average,
      genres,
      onConfirm: onAdd
    });
  
  return (
    <div className="relative flex flex-col aspect-video items-center">
      {!imageLoaded &&
        <div className="flex items-center justify-center absolute w-full h-full">
          <Spinner />
        </div>
      }
      <Image
        src={`${process.env.NEXT_PUBLIC_TMDB_IMAGES_HOST}/${backdrop_path}`}
        alt={title}
        width={1398}
        height={786}
        className="rounded-2xl w-full my-0 mx-auto hover:scale-105 cursor-pointer"
        onClick={onView}
        onLoadingComplete={() => setImageLoaded(true)}
      />
      <Label className="m-2 text-lg text-center">
        {movie.title}
      </Label>
    </div>
  )
}
export default MovieBanner;