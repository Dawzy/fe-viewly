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
import { useInputDialog } from "@/contexts/input-dialog-context";
import { getNewListDialogTemplate } from "@/utils/dialog-templates";
import { MAX_LIST_COUNT } from "@/constants";
import toast from "react-hot-toast";
import { Plus } from "lucide-react";

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
        (listName: string) => createNewList({ listName })
      )
    );
  
  const displayListsFullToast = () => toast.error("Lists limit reached!");
  
  if (isLoading) return (
    <div className="page w-full px-8 py-4 gap-4 flex-wrap justify-center items-center h-auto">
      <Spinner />
    </div>
  );

  if (isError || !data || !Array.isArray(data)) return (
    <div className="page w-full px-8 py-4 gap-4 flex-wrap justify-center items-center h-auto text-2xl">
      <p>Error loading lists, please try again later.</p>
    </div>
  );

  return (
    <>
      {/* Page Header */}
      <PageHeader
        title={`My Lists (${data.length}/${MAX_LIST_COUNT})`}
        onAdd={data.length < MAX_LIST_COUNT ? triggerNewListModal : displayListsFullToast}
      />

      {/* Page Content */}
      <div className="page w-full px-4 py-4 gap-4 flex-wrap justify-center items-start">
        {data.length === 0 ?
          <div className="w-full h-full flex items-center justify-center text-xl my-auto text-center">
            <h1>You don't have any lists! Try pressing on <Plus className="text-accent inline" /> to create a list!</h1>
          </div>
        :
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 max-w-full">
            {data.toReversed().map(list => {
              if (pendingListRename || pendingListDelete) {
                if (deleteVars?.listId == list.listId || renameVars?.listId == list.listId) 
                  return (<LoadingListCard key={list.listId} />);
              }

              return (
                <ListCard
                  key={list.listId}
                  list={list}
                  onRename={(listName: string) => renameList({ listName, listId: list.listId })}
                  onDelete={() => deleteList({ listId: list.listId })}
                />
              );
            })}

            {pendingNewList && <LoadingListCard/>}
          </div>
        }
      </div>
    </>
  )
}
export default MyLists;