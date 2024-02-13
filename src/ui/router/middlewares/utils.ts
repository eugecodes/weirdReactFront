import { useUserProvider } from "@/src/ui/provider/user.slice";

export function useAuthMiddlewareUtil() {
  const user = useUserProvider((state) => state.user);
  const me = useUserProvider((state) => state.me);

  const getUser = async () => {
    if (!!user) return user;
    return await me();
  };
  return getUser;
}
