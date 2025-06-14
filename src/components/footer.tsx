import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="fixed left-0 bottom-0 h-min w-screen flex justify-center gap-8 p-2 text-xs bg-on-surface border-t-2 border-border">
      <div>
        Developed By <Link
          target="_blank"
          rel="noopener noreferrer"
          className="font-bold underline"
          href={process.env.NEXT_PUBLIC_PORTFOLIO_URL}>
          David Fawzy
        </Link>
      </div>
      <div className="flex gap-2 text-xs">
        <Tooltip>
          <TooltipTrigger>
            <p className="flex gap-1">
              Powered by
              <Link
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center"
                href="https://www.themoviedb.org/"
              >
                <Image src="/TMDBLogo.svg" alt="TMDB Logo" width={72} height={32}/>
              </Link> 
            </p>
          </TooltipTrigger>
          <TooltipContent>
            <p className="font-bold">This website uses TMDB and the TMDB APIs but is not endorsed, certified, or otherwise approved by TMDB.</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  )
}
export default Footer;