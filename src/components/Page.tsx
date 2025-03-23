import { PageProps } from "@/types"
import { Plus } from "lucide-react"

const Page = ({ title, children }: PageProps) => {
  return (
    <div className="container flex-grow bg-surface flex flex-col gap-2 rounded-4xl text-secondary-text">
      {/* Page Header */}
      <div className="flex justify-between items-center border-b-2 border-b-border w-full px-8 py-4">
        <p className="md:text-3xl text-secondary-text font-bold">{title}</p>
        <Plus width={48} height={48} className="max-md:hidden text-primary" />
        <Plus width={32} height={32} className="md:hidden text-primary" />
      </div>

      {/* Page Content */}
      <div className="flex w-full p-4">
        {children}
      </div>
    </div>
  )
}
export default Page