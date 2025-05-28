"use client"

import { QueryClientProvider } from "@tanstack/react-query"
import { getQueryClient } from "@/query-api/get-query-client";
import { ReactNode } from "react";

export default function QueryProvider({ children }: { children: ReactNode }) {
  const queryClient = getQueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}