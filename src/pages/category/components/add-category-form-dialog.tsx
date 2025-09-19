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
import { Loader, Plus } from "lucide-react";
import { ServerErrorResponse, StoreCategoryRequest } from "@/lib/types";
import { storeCategoryRequestSchema } from "@/lib/schemas";
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
import { storeCategory } from "@/services/category.service";
import { toast } from "sonner";

function AddCategoryFormDialog() {
  const queryClient = useQueryClient();

  const storeCategoryMutation = useMutation({
    mutationFn: (payload: StoreCategoryRequest) => storeCategory(payload),
    onSuccess: (res) => {
      toast.success("Add Category", {
        position: "top-right",
        description: res.message,
      });

      form.reset();

      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (err: ServerErrorResponse) => {
      toast.error("Add Category", {
        position: "top-right",
        description: err.response.data.message,
      });
    },
  });

  const form = useForm<StoreCategoryRequest>({
    resolver: zodResolver(storeCategoryRequestSchema),
    defaultValues: {
      title: "",
    },
  });

  const handleSubmit = form.handleSubmit((data) =>
    storeCategoryMutation.mutate(data)
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          Add New <Plus className="pl-2 size-8" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            Add New Product Category <Plus className="pl-2 size-8" />
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <FormField
              control={form.control}
              name="image"
              render={() => (
                <FormItem className="w-full">
                  <FormLabel>Category Image</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      onChange={(e) =>
                        form.setValue("image", e.target.files![0])
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
            <Button
              className="w-full"
              disabled={storeCategoryMutation.isPending}
              type="submit"
            >
              {storeCategoryMutation.isPending ? (
                <Loader className="animate-spin" />
              ) : (
                "Add"
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default AddCategoryFormDialog;
