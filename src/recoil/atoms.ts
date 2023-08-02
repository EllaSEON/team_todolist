import { atom } from "recoil";
import { TodoItem } from "../Pages/Todo";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const tokenState = atom({
  key: "tokenState",
  default: "",
});

export const todoItemState = atom<TodoItem[]>({
  key: "todoItemState",
  default: [],
  effects_UNSTABLE: [persistAtom],
});
