import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { getMockData } from "@/utils";
import Image from "next/image";
import { PageHeader } from "@/components";
import { getQueryClient } from "@/utils/get-query-client";
import { listOptions } from "@/api/query-options";

const ListItemsPage = async ({
  params
}: {
  params: Promise<{ id: string }>
}) => {
  const { id } = await params;

  // Prefetch on serverside
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery( listOptions( id ) );

  return (
    <div className="page-container">
      {/* Page Header */}
      <PageHeader
        title="List Name!"
        options={{"Rename List": false, "Delete List": true }}
        showAddButton
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

        {/* Add movie button */}
        <Button className="flex justify-center items-center w-[122px] h-[162px] bg-on-surface rounded-2xl hover:bg-background">
          <Plus className="text-primary !h-12 w-12!" />
        </Button>
      </div>
    </div>
  )
}

export default ListItemsPage;