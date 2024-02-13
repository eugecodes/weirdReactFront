import type { MiddlewareHook } from "@/src/ui/router/route_middleware";
import { useAuthMiddlewareUtil } from "@/src/ui/router/middlewares/utils";
import paths from "@/src/ui/router/paths";

export const useAuthMiddleware: MiddlewareHook = () => {
  const getUser = useAuthMiddlewareUtil();

  return {
    errorRedirectUrl: paths.auth.login,
    promise: getUser()
  };
};
