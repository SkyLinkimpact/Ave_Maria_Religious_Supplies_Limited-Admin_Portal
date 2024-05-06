import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CheckIcon, ChevronsUpDown, Loader, Pencil } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  EditProductRequest,
  Product,
  ServerErrorResponse,
  StoreProductRequest,
} from "@/lib/types";
import { editProduct } from "@/services/product.service";
import { editProductRequestSchema } from "@/lib/schemas";
import useCategory from "@/hooks/category.hook";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";

type Props = {
  product: Product;
};

function EditProductFormDialog({ product }: Props) {
  const queryClient = useQueryClient();

  const { categories } = useCategory();

  const editProductMutation = useMutation({
    mutationFn: (payload: EditProductRequest) =>
      editProduct(product.id, payload),
    onSuccess: (res) => {
      toast.success("Edit Product", {
        position: "top-right",
        description: res.message,
      });

      form.reset();

      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (err: ServerErrorResponse) => {
      toast.error("Edit Product", {
        position: "top-right",
        description: err.response.data.message,
      });
    },
  });

  const form = useForm<StoreProductRequest>({
    resolver: zodResolver(editProductRequestSchema),
    defaultValues: {
      aws_link: product.awsLink === null ? "" : product.awsLink,
      category_id: product.category.id,
      inventory: 0,
      price: product.price,
      title: product.title,
      description: product.description,
    },
  });

  const handleSubmit = form.handleSubmit((data) =>
    editProductMutation.mutate({
      ...data,
      inventory: product.inventory + data.inventory, // add to current inventory
    })
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full">
          <Pencil />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            Edit Product <Pencil className="pl-2 size-8" />
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            className="flex items-center gap-6 flex-col w-full"
            onSubmit={handleSubmit}
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Rosary" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {categories && (
              <FormField
                control={form.control}
                name="category_id"
                render={({ field }) => (
                  <FormItem className="flex flex-col w-full">
                    <FormLabel>Product Category</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "w-full justify-between",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value
                              ? categories.find(
                                  (category) => category.id === field.value
                                )?.title
                              : "Select product category"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[350px] p-0">
                        <Command
                          filter={(value, search) =>
                            value
                              .toLocaleLowerCase()
                              .includes(search.toLocaleLowerCase())
                              ? 1
                              : 0
                          }
                        >
                          <CommandInput
                            placeholder="Search product category..."
                            className="h-9"
                          />
                          <CommandEmpty>
                            No product category found.
                          </CommandEmpty>
                          <CommandList>
                            {categories.map((itm) => (
                              <CommandItem
                                value={itm.title}
                                key={itm.id}
                                onSelect={() => {
                                  form.setValue("category_id", itm.id);
                                }}
                                onClick={() => {
                                  form.setValue("category_id", itm.id);
                                }}
                              >
                                {itm.title}
                                <CheckIcon
                                  className={cn(
                                    "ml-auto h-4 w-4",
                                    itm.id === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step={0.01}
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseFloat(e.target.value))
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="inventory"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Inventory (Quantity in stock)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={0}
                      step={1}
                      {...field}
                      onChange={(e) => field.onChange(parseInt(e.target.value))}
                    />
                  </FormControl>
                  <FormDescription>
                    {product.inventory + form.getValues("inventory")}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="aws_link"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Amazon Link</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className="w-full"
              disabled={editProductMutation.isPending}
              type="submit"
            >
              {editProductMutation.isPending ? (
                <Loader className="animate-spin" />
              ) : (
                "Update"
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default EditProductFormDialog;
