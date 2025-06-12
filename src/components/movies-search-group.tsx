"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { ChangeEvent, useState } from "react";
import toast from "react-hot-toast";
import MovieBannerCarousel from "./movie-banner-carousel";
import { searchQueryOptions } from "@/query-api/query-options";
import { sanitizeString } from "@/utils";

const MoviesSearchGroup = () => {
  const [value, setValue] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const onTextEntered = (e: ChangeEvent<HTMLInputElement>) => {
    const text = sanitizeString(e.target.value);
    if (text === " ") return;
    setValue( text );
  }
  
  const handleSearch = () => {
    if (value.length) {
      toast.error("Please enter something!")
      return;
    }
    setSearchQuery(value);
  }

  return (
    <>
      {/* Search bar */}
      <div className="relative max-w-xl">
        <Button
          type="button"
          onClick={handleSearch}
          variant="default"
          className="absolute right-0 h-full rounded-l-none rounded-r-2xl !px-8 w-1/12"
        >
          <Search className= "h-8 w-8"/>
        </Button>
        <Input
          type="search"
          placeholder="Search"
          value={value}
          className="py-6 pr-18 w-lg rounded-2xl"
          onChange={onTextEntered}
          onKeyDown={e => e.key === "Enter" && handleSearch()}
        />
      </div>

      {/* Results Popup */}
      {searchQuery &&
        <MovieBannerCarousel
          title={`Results for "${searchQuery}"`}
          queryOptions={
            searchQueryOptions({
              query: searchQuery.toLowerCase(),
              page: 1,
            }, searchQuery !== "")
          }
        />
      }
    </>
  )
}

export default MoviesSearchGroup;