import { MovieBannerProps } from "@/types";
import { Button } from "@/components/ui/button";

const MovieBanner = ({ movie }: MovieBannerProps) => {
  return (
    <Button variant="ghost" type="button" className="w-[360px] h-[200px] bg-accent">
      {movie.title}
    </Button>
  )
}
export default MovieBanner;