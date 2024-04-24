import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { GlobalContext, GlobalContextType } from "@/contexts/global.context";
import useCategory from "@/hooks/category.hook";
import { Loader } from "lucide-react";
import { useContext, useEffect } from "react";
import AddCategoryFormDialog from "./components/add-category-form-dialog";
import { formatDate } from "@/lib/utils";
import DeleteCategoryDialog from "./components/delete-category-dialog";
import EditCategoryFormDialog from "./components/edit-category-form-dialog";

function CategoryPage() {
  const { header, setHeader } = useContext(GlobalContext) as GlobalContextType;

  const { categories, isCategoriesLoading } = useCategory();

  useEffect(() => {
    if (header !== "Dashboard") return;

    setHeader("Categories");
  }, [header, setHeader]);

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="w-full py-4 flex">
        <div className="flex-1" />
        <AddCategoryFormDialog />
      </div>
      <div className="w-full flex min-h-48 overflow-x-scroll">
        {isCategoriesLoading && (
          <div className="flex w-full h-full italic items-center justify-center">
            <Loader className="animate-spin size-16 text-primary" />
          </div>
        )}

        {categories && categories.length > 0 && (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead />
                <TableHead>Title</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead />
              </TableRow>
            </TableHeader>

            <TableBody>
              {categories.map((category, idx) => (
                <TableRow key={category.id}>
                  <TableCell>{idx + 1}</TableCell>
                  <TableCell className="font-medium">
                    {category.title}
                  </TableCell>
                  <TableCell>{formatDate(category.createdAt)}</TableCell>
                  <TableCell>
                    <div className="flex gap-4">
                      <EditCategoryFormDialog category={category} />
                      <DeleteCategoryDialog category={category} />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}

        {!isCategoriesLoading && categories && categories.length < 1 && (
          <div className="flex-1 flex flex-col gap-y-4 justify-center items-center">
            <p className="text-center italic">Nothing to see here.</p>
            <AddCategoryFormDialog />
          </div>
        )}
      </div>
    </div>
  );
}

export default CategoryPage;
