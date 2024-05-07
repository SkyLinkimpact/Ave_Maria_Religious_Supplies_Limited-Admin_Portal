import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { DASHBOARD_ROUTE } from "@/routes";
import { LoginRequest, ServerErrorResponse } from "@/lib/types";
import { loginRequestSchema } from "@/lib/schemas";
import { useMutation } from "@tanstack/react-query";
import { login } from "@/services/user.service";
import { toast } from "sonner";

function LoginPage() {
  const form = useForm<LoginRequest>({
    resolver: zodResolver(loginRequestSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationFn: (payload: LoginRequest) => login(payload),
    onSuccess: (res) => {
      toast.success("Login", {
        position: "top-right",
        description: "You have successfully logged in",
      });

      window.localStorage.setItem("amrsl-admin_key", res.token);

      navigate(DASHBOARD_ROUTE);
    },
    onError: (err: ServerErrorResponse) => {
      toast.error("Login", {
        position: "top-right",
        description: err.response.data.message,
      });
    },
  });

  const handleSubmit = form.handleSubmit((data) => loginMutation.mutate(data));

  return (
    <Card className="w-[300px]">
      <CardHeader className="heading text-2xl text-primary">LOGIN</CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={handleSubmit} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="j.doe@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="flex items-center justify-center w-full"
              // disabled={loginMutation.isPending}
            >
              LOGIN
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export default LoginPage;
