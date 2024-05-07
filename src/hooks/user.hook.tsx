import { me } from "@/services/user.service";
import { useQuery } from "@tanstack/react-query";

function useUser() {
  const {
    data: user,
    isPending: isUserLoading,
    isError: isUserError,
  } = useQuery({
    queryKey: ["user"],
    queryFn: me,
    refetchOnWindowFocus: false,
  });
  return { user, isUserLoading, isUserError };
}

export default useUser;
