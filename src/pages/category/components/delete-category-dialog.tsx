import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Category, ServerErrorResponse } from "@/lib/types";
import { Trash2 } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCategory } from "@/services/category.service";
import { toast } from "sonner";

function DeleteCategoryDialog({ category }: Readonly<{ category: Category }>) {
  const [isOpen, setIsOpen] = useState(false);

  const queryClient = useQueryClient();

  const deleteCategoryMutation = useMutation({
    mutationFn: (categoryId: string) => deleteCategory(categoryId),
    onError: (err: ServerErrorResponse) => {
      toast.error("Remove category", {
        description: err.response.data.message,
        position: "top-right",
      });
    },
    onSuccess: () => {
      toast.success("Remove category", {
        description: "Category successfully removed",
        position: "top-right",
      });

      queryClient.invalidateQueries({ queryKey: ["categories"] });
      setIsOpen(false);
    },
  });

  const handleCategoryDelete = () => deleteCategoryMutation.mutate(category.id);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="destructive"
          size="icon"
          className="rounded-full"
          onClick={() => setIsOpen(true)}
        >
          <Trash2 />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Trash2 className="pr-2 size-8 text-red-600" />
            Remove "{category.title}" Category{" "}
          </DialogTitle>
        </DialogHeader>
        <div className="w-full flex flex-col items-center justify-center gap-y-4 h-14">
          <h4 className="text-lg uppercase"> Are you sure?</h4>
        </div>
        <DialogFooter>
          <div className="flex gap-4 w-full">
            <Button
              variant="destructive"
              className="flex-1"
              onClick={handleCategoryDelete}
              disabled={deleteCategoryMutation.isPending}
            >
              Continue
            </Button>
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default DeleteCategoryDialog;
