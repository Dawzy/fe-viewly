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
        (name: List["name"]) => createNewList({ name })
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
      <div className="page w-full px-8 py-4 gap-4 flex-wrap justify-between content-start">
        {data.map(list => {
          if (pendingListRename || pendingListDelete) {
            if (deleteVars?.id == list.id || renameVars?.id == list.id) 
              return (<LoadingListCard key={list.id} />);
          }

          return (
            <ListCard
              key={list.id}
              list={list}
              onRename={(name: List["name"]) => renameList({ name, id: list.id })}
              onDelete={() => deleteList({ id: list.id })}
            />
          );
        })}

        {pendingNewList && <LoadingListCard/>}
      </div>
    </>
  )
}
export default MyLists;