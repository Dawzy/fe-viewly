import { PageHeader, MyLists } from "@/components";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { getQueryClient } from "@/utils/get-query-client";
import { listsOptions } from "@/api/query-options";
import validator from "validator";

export default async function ListsPage({
  searchParams
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>}
) {
  let { page } = await searchParams;

  // If it's not a string or not a valid number, default to "1"
  if (typeof page != "string" || !validator.isInt(page))
    page = "1";

  // Prefetch on serverside
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery( listsOptions( parseInt(page) ) );

  return (
    <div className="page-container">
      {/* Page Header */}
      <PageHeader
        title="My Lists"
      />

      {/* Page Content */}
      <div className="page w-full px-8 py-4 gap-12 flex-wrap justify-center">
        <HydrationBoundary state={dehydrate( queryClient )}>
          <MyLists />
        </HydrationBoundary>
      </div>
    </div>
  );
}