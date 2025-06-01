import { ListCardProps } from "@/types";
import { Ellipsis } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { useInputDialog } from "@/contexts/input-dialog-context";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "./ui/dropdown-menu";
import { getDeleteDialogTemplate, getRenameDialogTemplate } from "@/utils/dialog-templates";

const ListCard = ({ list, onRename, onDelete }: ListCardProps) => {
  const { showDialog } = useInputDialog();

  const triggerRenameDialog = () =>
    showDialog(
      getRenameDialogTemplate(
        onRename,
        list.listName
      )
    );

  const triggerDeleteDialog = () =>
    showDialog(
      getDeleteDialogTemplate(
        onDelete,
        list.listName,
        list.movies.length
      )
    );

  return (
    <div className="relative flex flex-col items-center h-min p-6 bg-on-surface rounded-2xl max-w-52">
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button className="absolute top-0 right-0 hover:bg-transparent bg-transparent text-primary-text hover:text-accent transition-all">
            <Ellipsis className="!w-6 !h-6" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          <DropdownMenuItem className="text-lg" onClick={triggerRenameDialog}>
            Rename
          </DropdownMenuItem>
          <DropdownMenuItem className="text-lg text-destructive" onClick={triggerDeleteDialog}>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Link className="text-primary-text hover:text-accent transition-all text-center" href={`/lists/${list.listId}`} >
        <h2 className="w-44 text-xl font-semibold text-center">{list.listName}</h2>
        <p className="text-sm text-secondary-text mt-1">
          {list.movies.length} {list.movies.length === 1 ? "movie" : "movies"}
        </p>
      </Link>
    </div>
  );
}

export default ListCard;