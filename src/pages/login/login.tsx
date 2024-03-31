import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { LoginRequestSchema } from "./login.schema";
import { useForm } from "react-hook-form";
import { z } from "zod";
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

function LoginPage() {
  const form = useForm<z.infer<typeof LoginRequestSchema>>({
    resolver: zodResolver(LoginRequestSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate(DASHBOARD_ROUTE);
  };

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
