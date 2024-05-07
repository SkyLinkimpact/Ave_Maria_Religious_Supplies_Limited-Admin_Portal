import { Button } from "@/components/ui/button";
import { ServerErrorResponse } from "@/lib/types";
import { LOGIN_ROUTE } from "@/routes";
import { logout } from "@/services/user.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

function LogoutButton() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const logOutMutation = useMutation({
    mutationFn: logout,
    onSuccess: (res) => {
      toast.success("Logout", {
        position: "top-right",
        description: res.message,
      });

      window.localStorage.removeItem("amrsl-admin_key");
      queryClient.invalidateQueries({ queryKey: ["user"] });
      navigate(LOGIN_ROUTE);
    },
    onError: (err: ServerErrorResponse) => {
      toast.success("Logout", {
        position: "top-right",
        description: err.response.data.message,
      });

      window.localStorage.removeItem("amrsl-admin_key");
      queryClient.invalidateQueries({ queryKey: ["user"] });
      navigate(LOGIN_ROUTE);
    },
  });
  return (
    <Button
      variant="destructive"
      disabled={logOutMutation.isPending}
      onClick={() => logOutMutation.mutate()}
    >
      Logout
      {logOutMutation.isPending ? (
        <Loader className="animate-spin size-8 pl-4" />
      ) : (
        <LogOut className="size-8 pl-4" />
      )}
    </Button>
  );
}

export default LogoutButton;
