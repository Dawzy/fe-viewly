import { MovieCardProps } from "@/types";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { Spinner } from "@/components";
import { useConfirmDialog } from "@/contexts/confirm-dialog-context";
import { useMovieInfoDialog } from "@/contexts/movie-info-dialog-context";
import { getGenresFromIDs } from "@/utils";

const MovieCard = ({
  movie,
  onDelete,
  showLoading
}: MovieCardProps) => {
  const { showDialog: showConfirmDialog } = useConfirmDialog();
  const { showDialog: showInfoDialog } = useMovieInfoDialog();
  const {
    overview,
    poster_path,
    title,
    vote_average,
    genres: genre_ids,
    runtime
  } = movie;
  const genres = getGenresFromIDs(genre_ids);

  const triggerConfirmDeleteDialog = () =>
    showConfirmDialog({
      onConfirm: onDelete,
      title: "Are you sure?",
      desc: `Are you sure you want to remove ${title}?`,
      confirmButtonText: "Remove",
      isDestructive: true
    });

  const triggerInfoDialog = () =>
    showInfoDialog({
      onConfirm: triggerConfirmDeleteDialog,
      runtime,
      overview,
      poster_path,
      title,
      vote_average,
      genres,
      isRemove: true
    });

  return (
    <div className="justify-center w-40 h-48 flex flex-col items-center">
      <div className="relative w-[122px] h-[162px] flex items-center justify-center">
        <Image
          src={`${process.env.NEXT_PUBLIC_TMDB_IMAGES_HOST}/${poster_path}`}
          alt={title}
          className={`rounded-2xl w-full h-full object-cover ${!showLoading && "hover:scale-110 transition-all cursor-pointer"}`}
          width={122}
          height={162}
          onClick={triggerInfoDialog}
        />

        {showLoading &&
          <div className="absolute opacity-85 bg-black w-full h-full z-20 rounded-2xl flex justify-center items-center">
            <Spinner />
          </div>
        }
      </div>

      <div className="rounded-2xl w-[122px] h-[162px] text-left flex items-center justify-center gap-2">
        <p className="text-nowrap">{title}</p>
      </div>
    </div>
  )
}

export default MovieCard;