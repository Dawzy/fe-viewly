"use client";

import { List, MovieInfoDialogProps } from "@/types";
import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState
} from "react";
import { formatTime, ratingToColor } from "@/utils";
import Image from "next/image";

import { Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandItem,
  CommandGroup,
  CommandList,
  CommandInput
} from "@/components/ui/command";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Spinner } from "@/components";
import { useQuery } from "@tanstack/react-query";
import { listsQueryOptions } from "@/query-api/query-options";
import { MAX_MOVIE_IN_LIST_COUNT } from "@/constants";

const DEFAULT_VALUE: MovieInfoDialogProps = {
  onConfirm: () => {},
  overview: "",
  poster_path: "",
  title: "",
  runtime: 91,
  vote_average: 7.5,
  genres: [],
}

type DialogContextType = {
  showDialog: (props: MovieInfoDialogProps) => void;
};

const DialogContext = createContext<DialogContextType | null>(null);

export const useMovieInfoDialog = () => {
  const context = useContext(DialogContext);
  if (!context) throw new Error("DialogProvider is missing");
  return context;
};

export const MovieInfoDialogProvider = ({
  children
}: {
  children: React.ReactNode
}) => {
  // State
  const [openLists, setOpenLists] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [dialogProps, setDialogProps] = useState<MovieInfoDialogProps>(DEFAULT_VALUE);
  const [posterLoaded, setPosterLoaded] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const allowCloseRef = useRef(false);
  const {
    genres,
    overview,
    title,
    runtime,
    vote_average,
    poster_path,
    onConfirm,
    isRemove
  } = dialogProps;

  const {
    data: lists,
    isLoading: isLoadingList,
    isError: isErrorList
  } = useQuery( listsQueryOptions(!isRemove) ); // Only fetch lists when we want to add a movie to them

  const showDialog = useCallback((props: MovieInfoDialogProps) => {
    setDialogProps(props);
    setIsOpen(true);

    // Set timeout to prevent UI bug where click on dropdown menu items
    // closes dialog. Fixing it by debouncing closing on outside click
    allowCloseRef.current = false;

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(
      () => { allowCloseRef.current = true; },
      250
    );
  }, []);

  const closeDialog = () => {
    setIsOpen(false);
    setOpenLists(false);
  };

  const onClick = async (list: List | undefined) => {
    onConfirm(list?.listId);
    closeDialog();
  }

  return (
    <DialogContext.Provider value={{ showDialog }}>
      {children}
      <Dialog modal={true} open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent onInteractOutside={(e) => !allowCloseRef.current && e.preventDefault()} aria-describedby={undefined}>
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">
              {title}
            </DialogTitle>
          </DialogHeader>

          <div className="flex flex-col md:flex-row gap-6">
            {/* Movie Poster */}
            <div className="flex-shrink-0 mx-auto md:mx-0">
              <div className="relative w-48 h-72 rounded-lg overflow-hidden">
                {!posterLoaded &&
                  <div className="absolute flex justify-center items-center w-full h-full">
                    <Spinner />
                  </div>
                }
                <Image
                  src={`${process.env.NEXT_PUBLIC_TMDB_IMAGES_HOST}${poster_path}`}
                  alt={title}
                  fill
                  className="object-cover"
                  priority
                  onLoad={() => setPosterLoaded(true)}
                  sizes="192px"
                />
                {vote_average && (
                  <div className={`absolute bottom-2 left-2 flex items-center gap-1 px-2 py-1 rounded-full bg-black/50`}>
                    <span
                      className="text-sm font-medium text-[var(--rating-color)]"
                      style={{"--rating-color": ratingToColor(vote_average / 10)} as React.CSSProperties}
                    >
                      { (vote_average * 10).toFixed(0) }%
                    </span>
                  </div>
                )}
              </div>

              {genres && genres.length > 0 && (
                <div className="max-w-48">
                  <h3 className="font-semibold mb-2">Genres</h3>
                  <div className="flex flex-wrap gap-2">
                    {genres.map((genre) => (
                      <span key={genre.id} className="px-2 py-1 bg-muted text-muted-foreground rounded-md text-sm">
                        {genre.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Movie Details */}
            <div className="flex-1 space-y-4">
              {/* Runtime */}
              {runtime && 
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>{formatTime(runtime)}</span>
                </div>
              }

              {/* Overview */}
              <div>
                <h3 className="font-semibold mb-2">Overview</h3>
                <p className="text-muted-foreground leading-relaxed">{overview}</p>
              </div>
            </div>
          </div>
      
          {/* Footer */}
          <DialogFooter className="sm:justify-around">
            <Button type="button" variant="outline" className="w-1/3" onClick={closeDialog}>
              Close
            </Button>
            
            {isRemove ?
              <Button variant="destructive" className="w-1/3" onClick={() => onClick(undefined)}>
                Remove
              </Button>
            :
              <Popover modal={true} open={openLists} onOpenChange={setOpenLists}>
                <PopoverTrigger asChild>
                  <Button role="combobox" variant="default" className="w-1/3" aria-expanded={openLists}>
                    Add To List
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0 z-50" aria-describedby={undefined}>
                  <Command>
                    {isLoadingList ? 
                      <div className="flex justify-center items-center py-5">
                        <Spinner />
                      </div>
                    :
                      <>
                        <CommandInput placeholder="Search lists..." className="h-9" />
                        <CommandList>
                          <CommandEmpty>{isErrorList ? "An error occured, please try again later." : "No lists found."}</CommandEmpty>
                          <CommandGroup>
                            {!isErrorList &&
                              lists?.map(list => (list.movies.length < MAX_MOVIE_IN_LIST_COUNT &&
                                <CommandItem
                                key={list.listId}
                                value={list.listId}
                                onSelect={() => onClick(list)}
                                >
                                  {list.listName}
                                </CommandItem>
                              ))
                            }
                          </CommandGroup>
                        </CommandList>
                      </>
                    }
                  </Command>
                </PopoverContent>
              </Popover>
            }
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DialogContext.Provider>
  );
};