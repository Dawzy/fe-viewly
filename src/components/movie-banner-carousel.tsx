"use client";

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useQuery } from "@tanstack/react-query";
import { MovieBanner, Spinner } from "@/components";
import { useState } from "react";
import {
  ChevronRight,
  ChevronLeft
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-label";
import { MovieBannerCarouselProps } from "@/types";

const MovieBannerCarousel = ({ title, queryOptions }: MovieBannerCarouselProps) => {
  const [carouselAPI, setCarouselAPI] = useState<CarouselApi>();

  const {
    data,
    isLoading,
    isError
  } = useQuery( queryOptions );

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
      <Carousel className="w-full bg-on-surface rounded-2xl" setApi={setCarouselAPI}>
        {(isError) ?
          <div className="flex justify-center items-center w-full h-full">
            <p>Error loading results, please try again later.</p>
          </div>
        :  
          <CarouselContent className="-ml-2 w-full h-full py-3 rounded-2xl">
            {isLoading ?
              <div className="flex justify-center items-center w-full h-[200px]">
                <Spinner />
              </div>
            :
              data?.results.map( (movie, index) => movie.backdrop_path && (
                <CarouselItem key={index} className="sm:pl-2 md:pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5">
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