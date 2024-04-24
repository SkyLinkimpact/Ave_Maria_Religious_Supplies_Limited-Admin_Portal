import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import { Loader, Pencil } from "lucide-react";
import {
  Category,
  ServerErrorResponse,
  StoreCategoryRequest,
  UpdateCategoryRequest,
} from "@/lib/types";
import { updateCategoryRequestSchema } from "@/lib/schemas";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editCategory } from "@/services/category.service";
import { toast } from "sonner";
import { useState } from "react";

function EditCategoryFormDialog({
  category,
}: Readonly<{ category: Category }>) {
  const [isOpen, setIsOpen] = useState(false);

  const queryClient = useQueryClient();

  const editCategoryMutation = useMutation({
    mutationFn: (payload: UpdateCategoryRequest) =>
      editCategory(category.id, payload),
    onSuccess: (res) => {
      toast.success("Edit Category", {
        position: "top-right",
        description: res.message,
      });

      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (err: ServerErrorResponse) => {
      toast.error("Edit Category", {
        position: "top-right",
        description: err.response.data.message,
      });
    },
  });

  const form = useForm<StoreCategoryRequest>({
    resolver: zodResolver(updateCategoryRequestSchema),
    defaultValues: {
      title: category.title,
    },
  });

  const handleSubmit = form.handleSubmit((data) =>
    editCategoryMutation.mutate(data)
  );

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full"
          onClick={() => setIsOpen(true)}
        >
          <Pencil />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Pencil className="pr-2 size-8" /> Edit Category ({category.id})
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Easter Card" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-4 w-full">
              <Button
                className="w-full"
                disabled={editCategoryMutation.isPending}
                type="submit"
              >
                {editCategoryMutation.isPending ? (
                  <Loader className="animate-spin" />
                ) : (
                  "Update"
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default EditCategoryFormDialog;
