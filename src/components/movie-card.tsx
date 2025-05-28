import { MovieCardProps } from "@/types";
import Image from "next/image";

const MovieCard = ({ movie }: MovieCardProps) => {
  return (
    <div className="w-32 h-48 flex flex-col items-center p-1">
      {/* <Image
        src={img}
        alt=""
        className="rounded-2xl h-min"

        width={122}
        height={162}
      /> */}
      <div className="rounded-2xl w-[122px] h-[162px]">
        {movie.name}
      </div>
    </div>
  )
}

export default MovieCard;