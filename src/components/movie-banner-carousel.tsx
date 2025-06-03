"use client";

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { browseQueryOptions } from "@/query-api/query-options";
import { useQuery } from "@tanstack/react-query";
import { MovieBanner, Spinner } from "@/components";
import { useState } from "react";
import {
  ChevronRight,
  ChevronLeft
} from "lucide-react";
import { Button } from "./ui/button";
import { Label } from "@radix-ui/react-label";
import { MovieBannerCarouselProps } from "@/types";

const MovieBannerCarousel = ({ title, category, page }: MovieBannerCarouselProps) => {
  const [carouselAPI, setCarouselAPI] = useState<CarouselApi>();

  const {
    data,
    isLoading,
    isError
  } = useQuery( browseQueryOptions({ category, page }) );

  return (
    <>
      <div className="flex items-center justify-between w-full h-min">
        <Label className="md:text-3xl font-bold">
          {title}
        </Label>
        { (!isLoading && !isError) &&
          <div className="flex items-center">
            <Button type="button" onClick={() => carouselAPI?.scrollPrev()} variant="link" className="text-accent hover:text-foreground !px-0">
              <ChevronLeft className="!w-8 !h-8" />
            </Button>
            <Button type="button" onClick={() => carouselAPI?.scrollNext()} variant="link" className="text-accent hover:text-foreground !px-0">
              <ChevronRight className="!w-8 !h-8" />
            </Button>
          </div>
        }
      </div>
      <Carousel className="w-full h-[225px] bg-on-surface rounded-2xl" setApi={setCarouselAPI}>
        {(isError || !data) ?
        <div className="flex justify-center items-center w-full h-[200px]">
          <p>Error loading the {category} category, please try again later.</p>
        </div>
        :  
        <CarouselContent className="-ml-0 w-full h-full py-3 rounded-2xl">
          {isLoading ?
          <div className="flex justify-center items-center w-full h-[200px]">
            <Spinner />
          </div>
          :
          data.results.map( (movie, index) => (
            <CarouselItem key={index} className="pl-9 md:basis-1/2 lg:basis-1/3 w-full h-full">
              <MovieBanner movie={movie} />
            </CarouselItem>
          ))
          }
        </CarouselContent>
        }
      </Carousel>
    </>
  )
}
export default MovieBannerCarousel;