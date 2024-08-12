import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "userLoginState",
  storage: sessionStorage,
});

export const isAuth = atom({
  key: "userLoggedIn",
  default: {
    email: "",
    isLoggedIn: false,
  },
  effects_UNSTABLE: [persistAtom],
});
