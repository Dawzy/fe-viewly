import { Ellipsis, Plus } from "lucide-react"
import { ListPageProps } from "@/types";
import { getMockData } from "@/utils";
import Image from "next/image";

import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const ListItemsPage = async ({ params }: ListPageProps) => {
  const { id } = await params;
  return (
    <div className="container flex-grow flex flex-col gap-2">
      {/* Page Header */}
      <div className="container bg-surface rounded-2xl flex justify-between items-center w-full px-4 py-4">
        <Label className="md:text-3xl font-bold">List</Label>
        <div className="flex gap-2 text-primary items-center">
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button className="hover:bg-transparent bg-transparent text-inherit hover:text-on-cta !px-0">
                <Ellipsis className="!w-8 !h-8" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent>
              <DropdownMenuItem className="text-lg">Rename List</DropdownMenuItem>
              <DropdownMenuItem className="text-lg text-destructive">Delete List</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button className="hover:bg-transparent bg-transparent text-inherit hover:text-foreground !pl-1 !pr-0">
                <Plus className="!w-8 !h-8" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent>
              <DropdownMenuItem className="text-lg">Add Movie</DropdownMenuItem>
              <DropdownMenuItem className="text-lg">New List</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

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