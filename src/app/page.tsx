import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";

export default function Home() {
  return (
    <div className="container flex-grow flex flex-col gap-2 text-secondary-text">
      {/* Page Header */}
      <div className="container bg-surface rounded-2xl flex justify-between items-center w-full px-8 py-4 rounded-">
        <Label className="md:text-3xl text-secondary-text font-bold">List</Label>
        <div className="flex gap-2 text-primary items-center">
          <Button className="hover:bg-transparent bg-transparent text-inherit hover:text-foreground !pl-1 !pr-0">
            <Plus className="!w-8 !h-8" />
          </Button>
        </div>
      </div>

      {/* Page Content */}
      <div className="page w-full px-8 py-4 gap-12 flex-wrap justify-center">

      </div>
    </div>
  );
}