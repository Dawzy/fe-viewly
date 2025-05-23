"use client";

import { useSearchParams  } from "next/navigation"
import { listsOptions } from "@/api/query-options";
import { useQuery } from "@tanstack/react-query";
import Spinner from "./spinner";

const MyLists = () => {
  const searchParams = useSearchParams();
  const page = searchParams.get("page");
  
  const {
    data,
    isLoading,
    isError
  } = useQuery(listsOptions( parseInt(page || "1") ));

  
  if (isLoading) return (
    <div className="flex justify-center items-center w-full h-auto">
      <Spinner />
    </div>
  );
  
  if (isError) return (
    <div className="flex justify-center items-center w-full h-auto text-2xl">
      <p>Error loading lists, please try again later.</p>
    </div>
  );
  
  return (
    <>
      MY LISTS {page}
    </>
  )
}
export default MyLists;