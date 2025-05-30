import { MovieCardProps } from "@/types";
import { getMockData } from "@/utils";
import Image from "next/image";
import { Button } from "./ui/button";
import { Trash } from "lucide-react";
import { useConfirmDialog } from "@/contexts/confirm-dialog-context";
import Spinner from "./spinner";

const MovieCard = ({
  movie,
  onDelete,
  showLoading
}: MovieCardProps) => {
  const imgs = getMockData();
  const { showDialog } = useConfirmDialog();

  const triggerConfirmDeleteDialog = () =>
    showDialog({
      onConfirm: onDelete,
      title: "Are you sure?",
      desc: `Are you sure you want to remove ${movie.name}?`,
      confirmButtonText: "Remove",
      isDestructive: true
    });

  return (
    <div className="justify-center w-40 h-48 flex flex-col items-center">
      <div className="relative w-[122px] h-[162px] flex items-center justify-center">
        <Image
          src={imgs[Math.floor(Math.random()*imgs.length)]}
          alt=""
          className={`rounded-2xl w-full h-full object-cover ${!showLoading && "hover:scale-110 transition-all cursor-pointer"}`}
          width={122}
          height={162}
          onClick={() => {}}
        />

        {showLoading &&
          <div className="absolute opacity-85 bg-black w-full h-full z-20 rounded-2xl flex justify-center items-center">
            <Spinner />
          </div>
        }
      </div>

      <div className="rounded-2xl w-[122px] h-[162px] text-left flex items-center justify-between gap-2">
        <p className="text-nowrap">{movie.name}</p>
        <Button disabled={showLoading} onClick={triggerConfirmDeleteDialog} className="text-destructive !p-0 hover:bg-transparent bg-transparent hover:text-primary-text">
          <Trash className="!w-4 !h-4" />
        </Button>
      </div>
    </div>
  )
}

export default MovieCard;