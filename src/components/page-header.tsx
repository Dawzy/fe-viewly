import { Ellipsis, Plus } from "lucide-react"
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { PageHeaderProps } from "@/types";

const PageHeader = ({ title, options }: PageHeaderProps) => {
  return (
    <div className="container bg-surface rounded-2xl flex justify-between items-center w-full px-8 py-4">
      <Label className="text-secondary-text md:text-3xl font-bold">{title}</Label>
      <div className="flex gap-2 text-primary items-center">
        {options &&
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button className="hover:bg-transparent bg-transparent text-inherit hover:text-on-cta !px-0">
                <Ellipsis className="!w-8 !h-8" />
              </Button>
            </DropdownMenuTrigger>

              <DropdownMenuContent>
                {Object.keys(options).map( (option, index) =>
                  <DropdownMenuItem key={index} className={`text-lg ${options[option] && "text-destructive"}`}>
                    {option}
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
          </DropdownMenu>
        }

        <Button className="hover:bg-transparent bg-transparent text-inherit hover:text-foreground !pl-1 !pr-0">
          <Plus className="!w-8 !h-8" />
        </Button>
      </div>
  </div>
  )
}
export default PageHeader;