"use client";

import { listsQueryOptions } from "@/query-api/query-options";
import { useQuery } from "@tanstack/react-query";
import {
  useDeleteListMutation,
  useNewListMutation,
  useRenameListMutation
} from "@/query-api/mutations";
import {
  ListCard,
  LoadingListCard,
  PageHeader,
  Spinner
} from "@/components";
import { List } from "@/types";
import { useInputDialog } from "@/contexts/input-dialog-context";
import { getNewListDialogTemplate } from "@/utils";

const MyLists = () => {
  const { showDialog } = useInputDialog();
  const {
    data,
    isLoading,
    isError
  } = useQuery(listsQueryOptions());

  // Mutations
  const {
    mutate: createNewList,
    isPending: pendingNewList
  } = useNewListMutation();

  const {
    mutate: renameList,
    isPending: pendingListRename,
    variables: renameVars
  } = useRenameListMutation();

  const {
    mutate: deleteList,
    isPending: pendingListDelete,
    variables: deleteVars
  } = useDeleteListMutation();

  // UI Methods
  const triggerNewListModal = () =>
    showDialog(
      getNewListDialogTemplate(
        (listName: List["listName"]) => createNewList({ listName })
      )
    );
  
  if (isLoading) return (
    <div className="page w-full px-8 py-4 gap-4 flex-wrap justify-center items-center h-auto">
      <Spinner />
    </div>
  );
  
  if (isError || !data) return (
    <div className="page w-full px-8 py-4 gap-4 flex-wrap justify-center items-center h-auto text-2xl">
      <p>Error loading lists, please try again later.</p>
    </div>
  );

  return (
    <>
      {/* Page Header */}
      <PageHeader
        title="My Lists"
        onAdd={triggerNewListModal}
      />

      {/* Page Content */}
      <div className="page w-full px-8 py-4 gap-4 flex-wrap justify-center">
        <div className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(208px,1fr))] max-w-6xl w-full px-4">
          {data.map(list => {
            if (pendingListRename || pendingListDelete) {
              if (deleteVars?.listId == list.listId || renameVars?.listId == list.listId) 
                return (<LoadingListCard key={list.listId} />);
            }

            return (
              <ListCard
                key={list.listId}
                list={list}
                onRename={(listName: List["listName"]) => renameList({ listName, listId: list.listId })}
                onDelete={() => deleteList({ listId: list.listId })}
              />
            );
          })}

          {pendingNewList && <LoadingListCard/>}
        </div>
      </div>
    </>
  )
}
export default MyLists;