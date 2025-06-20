"use client";

import { useInputDialog } from "@/contexts/input-dialog-context";
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { MoviesProps } from "@/types";
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
  useRemoveMovieMutation,
} from "@/query-api/mutations";
import {
  getDeleteDialogTemplate,
  getRenameDialogTemplate
} from "@/utils/dialog-templates";
import { redirect } from "next/navigation";
import { formatTime } from "@/utils";

const MyMovies = ({ listId }: MoviesProps) => {
  const { showDialog } = useInputDialog();
  const {
    data: list,
    isLoading,
    isError
  } = useQuery( listQueryOptions(listId) );

  const totalWatchTime = list?.movies.reduce((total, movie) => total + movie.runtime, 0) || 0;

  const {
    mutate: renameList,
    isPending: pendingListRename,
    variables: renameVars
  } = useRenameListMutation();

  const {
    mutateAsync: deleteList,
  } = useDeleteListMutation();

  const {
    mutate: removeMovie,
    isPending: pendingMovieDelete,
    variables: movieVars
  } = useRemoveMovieMutation();

  const onAdd = () => redirect("/browse");

  const triggerRenameDialog = () => {
    if (!list) return;
    showDialog(
      getRenameDialogTemplate(
        (listName: string) => renameList({ listName, listId: list.listId }),
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
        title={`${renameVars ? renameVars.listName : list.listName} | ${ formatTime(totalWatchTime) }`}
        pendingChange={pendingListRename}
        options={[
          { optionName: "Add Movie", onClick: onAdd, isDestructive: false },
          { optionName: "Rename List", onClick: triggerRenameDialog, isDestructive: false },
          { optionName: "Delete List", onClick: triggerDeleteDialog, isDestructive: true  }
        ]}
      />

      {/* Page Content */}
      <div className="page w-full px-4 py-4 justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-7 gap-4 max-w-full">
          {list.movies.map(movie =>
            <MovieCard
              key={movie.movieId}
              movie={movie}
              onDelete={() => removeMovie({ listId: list.listId, movieId: movie.movieId })}
              showLoading={
                pendingMovieDelete &&
                movieVars !== undefined &&
                movieVars.movieId === movie.movieId
              }
            />
          )}

          {/* Add movie button */}
          <Button onClick={onAdd} className="flex justify-center items-center max-w-40 max-h-48 mx-auto w-[122px] h-[162px] bg-on-surface rounded-2xl hover:bg-background">
            <Plus className="text-primary !h-12 !w-12" />
          </Button>
        </div>
      </div>
    </>
  )
}
export default MyMovies;