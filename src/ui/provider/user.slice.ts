import { createStore, useStore } from "zustand";
import type { UserState } from "@/src/ui/view_models/user_state";
import type { LoginModel } from "@/src/core/user/domain/models/login_model";
import UserController from "../controller/user_controller";

export const userProvider = createStore<UserState>((set) => ({
  user: undefined,
  async me() {
    const user = await UserController.me();
    set({ user: user });
  },
  async logout() {
    await UserController.logout();
    set({ user: undefined });
  },
  async login(values: LoginModel) {
    const session = await UserController.login(values);
    set({ user: session.user });
  }
}));

export function useUserProvider(): UserState;
export function useUserProvider<T>(selector: (state: UserState) => T, equals?: (a: T, b: T) => boolean): T;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useUserProvider(selector?: any, equals?: any) {
  return useStore(userProvider, selector, equals);
}
