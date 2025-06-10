import Image from "next/image";

const Footer = () => {
  return (
    <div className="fixed left-0 bottom-0 h-min w-screen flex justify-center gap-8 p-2 text-xs bg-on-surface border-t-2 border-border">
      <div>
        Developed By <span className="font-bold">David Fawzy</span>
      </div>
      <div className="flex gap-2 text-xs">
        Powered by <Image src="/TMDBLogo.svg" alt="TMDB Logo" width={72} height={32}/>
      </div>
    </div>
  )
}
export default Footer;