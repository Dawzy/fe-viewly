import { ListCardProps } from "@/types";
import { Ellipsis } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { useInputDialog } from "@/contexts/InputDialogContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "./ui/dropdown-menu";

const ListCard = ({ list, onRename, onDelete }: ListCardProps) => {
  const { showDialog } = useInputDialog();

  const triggerRenameDialog = () =>
    showDialog({
      onConfirm: onRename,
  
      title: `Rename ${list.name}`,
      desc: `Enter the new name of ${list.name}`,
    
      label: "Name",
      confirmButtonText: "Rename",
      maxInputLength: 20,
    });

  const triggerDeleteDialog = () =>
    showDialog({
      onConfirm: onDelete,
  
      title: `Delete ${list?.name}`,
      desc: `Are you sure want to delete ${list.name} with ${list.movies.length} movies?`,
    
      isDestructive: true,
      destructiveWord: "DELETE",
      confirmButtonText: "Delete"
    });

  return (
    <div className="relative flex flex-col items-center h-min p-6 bg-on-surface rounded-2xl">
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button className="absolute top-0 right-0 hover:bg-transparent bg-transparent cursor-pointer text-primary-text hover:text-accent transition-all">
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

      <Link className="text-primary-text hover:text-accent transition-all text-center" href={`/lists/${list.id}`} >
        <h2 className="w-44 text-xl font-semibold text-center">{list.name}</h2>
        <p className="text-sm text-secondary-text mt-1">
          {list.movies.length} {list.movies.length === 1 ? "movie" : "movies"}
        </p>
      </Link>
    </div>
  );
}

export default ListCard;