import { Spinner } from "@/components";

const LoadingListCard = () => {
  return (
    <div className="flex w-52 h-24 justify-center items-center p-6 bg-on-surface rounded-2xl">
      <Spinner />
    </div>
  )
}

export default LoadingListCard;