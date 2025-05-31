"use client";

import { useInputDialog } from "@/contexts/input-dialog-context";
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { List, MoviesProps } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { listQueryOptions } from "@/query-api/query-options";
import {
  MovieCard,
  Spinner,
  PageHeader
} from "@/components";
import {
  useRenameListMutation,
  useDeleteListMutation,
  usePatchMovieMutation,
} from "@/query-api/mutations";
import {
  getDeleteDialogTemplate,
  getRenameDialogTemplate
} from "@/utils";
import { redirect } from "next/navigation";

const MyMovies = ({ listId }: MoviesProps) => {
  const { showDialog } = useInputDialog();
  const {
    data: list,
    isLoading,
    isError
  } = useQuery( listQueryOptions(listId) );

  const {
    mutate: renameList,
    isPending: pendingListRename,
    variables: renameVars
  } = useRenameListMutation();

  const {
    mutateAsync: deleteList,
  } = useDeleteListMutation();

  const {
    mutate: deleteMovie,
    isPending: pendingMovieDelete,
    variables: movieVars
  } = usePatchMovieMutation();

  const onAdd = () => redirect("/browse");

  const triggerRenameDialog = () => {
    if (!list) return;
    showDialog(
      getRenameDialogTemplate(
        (listName: List["listName"]) => renameList({ listName, listId: list.listId }),
        list.listName
      )
    );
  }

  const triggerDeleteDialog = () => {
    if (!list) return;
    showDialog(
      getDeleteDialogTemplate(
        async () => {
          await deleteList({ listId: list.listId });
          redirect("/lists");
        },
        list.listName,
        list.movies.length
      )
    );
  }

  if (isLoading) return (
    <div className="page w-full px-4 py-4 gap-6 flex-wrap justify-center items-center h-auto">
      <Spinner />
    </div>
  );
  
  if (isError || !list) return (
    <div className="page w-full px-4 py-4 gap-6 flex-wrap justify-center items-center h-auto text-2xl">
      <p>Error loading movies, please try again later.</p>
    </div>
  );

  return (
    <>
      {/* Page Header */}
      <PageHeader
        title={renameVars ? renameVars.listName : list.listName}
        pendingChange={pendingListRename}
        options={[
          { optionName: "Add Movie", onClick: onAdd, isDestructive: false },
          { optionName: "Rename List", onClick: triggerRenameDialog, isDestructive: false },
          { optionName: "Delete List", onClick: triggerDeleteDialog, isDestructive: true  }
        ]}
      />

      {/* Page Content */}
      <div className="page w-full px-4 py-4 justify-center">
        <div className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(130px,1fr))] max-w-6xl w-full px-4">
          {list.movies.map(movie =>
            <MovieCard
              key={movie.id}
              movie={movie}
              onDelete={() => deleteMovie({ listId: list.listId, movies: list.movies.filter(m => m.id === movie.id) })}
              showLoading={
                pendingMovieDelete &&
                movieVars?.listId !== undefined &&
                movie.id === movieVars.listId
              }
            />
          )}

          {/* Add movie button */}
          <Button onClick={onAdd} className="flex justify-center items-center w-[122px] h-[162px] bg-on-surface rounded-2xl hover:bg-background">
            <Plus className="text-primary !h-12 !w-12" />
          </Button>
        </div>
      </div>
    </>
  )
}
export default MyMovies;