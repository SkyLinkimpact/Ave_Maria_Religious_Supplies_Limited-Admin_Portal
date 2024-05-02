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
import { Product, ServerErrorResponse } from "@/lib/types";
import { Trash2 } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { deleteProduct } from "@/services/product.service";

function DeleteProductDialog({ product }: Readonly<{ product: Product }>) {
  const [isOpen, setIsOpen] = useState(false);

  const queryClient = useQueryClient();

  const deleteProductMutation = useMutation({
    mutationFn: (productId: string) => deleteProduct(productId),
    onError: (err: ServerErrorResponse) => {
      toast.error("Remove product", {
        description: err.response.data.message,
        position: "top-right",
      });
    },
    onSuccess: () => {
      toast.success("Remove product", {
        description: "Product successfully removed",
        position: "top-right",
      });

      queryClient.invalidateQueries({ queryKey: ["products"] });
      setIsOpen(false);
    },
  });

  const handleCategoryDelete = () => deleteProductMutation.mutate(product.id);

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
            Remove "{product.title}" Product
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
              disabled={deleteProductMutation.isPending}
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

export default DeleteProductDialog;
