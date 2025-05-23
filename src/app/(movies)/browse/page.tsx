import { PageHeader } from "@/components";
import { getMockData } from "@/utils";
import Image from "next/image";

const ListItemsPage = async () => {
  return (
    <div className="page-container">
      {/* Page Header */}
      <PageHeader
        title="Trending"
      />

      {/* Page Content */}
      <div className="page w-full px-4 py-4 gap-6 flex-wrap">
        {getMockData().map( (img, index) =>
          <Image
            key={index}
            src={img}
            alt=""
            className="rounded-2xl h-min"

            width={122}
            height={162}
          />
        )}
      </div>
    </div>
  )
}

export default ListItemsPage;