import { Spinner } from "@/components";

const LoadingPage = () => {
  return (
    <div className="page-container">
      <div className="page flex-col items-center justify-center w-full px-4 py-4 gap-6">
        <Spinner />
      </div>
    </div>
  )
}
export default LoadingPage;