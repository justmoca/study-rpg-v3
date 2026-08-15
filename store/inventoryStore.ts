import { create } from "zustand";
import { Item } from "@/types/item";
import { usePlayerStore } from "./playerStore";

interface InventoryStore {

  items: Item[];

  addItem: (item: Item) => void;

  removeItem: (id: number) => void;

  equipItem: (id: number) => void;

  unequipItem: (
    type: "weapon" | "armor" | "accessory"
  ) => void;

}

export const useInventoryStore = create<InventoryStore>((set, get) => ({

  items: [],

  addItem: (item) =>
    set((state) => ({

      items: [...state.items, item],

    })),

  removeItem: (id) =>
    set((state) => ({

      items: state.items.filter(
        (item) => item.id !== id
      ),

    })),

  equipItem: (id) => {

    const item = get().items.find(
      (item) => item.id === id
    );

    if (!item) return;

    const { player, setPlayer } =
      usePlayerStore.getState();

    setPlayer({

      ...player,

      equipped: {

        ...player.equipped,

        [item.type]: item.id,

      },

    });

  },

  unequipItem: (type) => {

    const { player, setPlayer } =
      usePlayerStore.getState();

    setPlayer({

      ...player,

      equipped: {

        ...player.equipped,

        [type]: null,

      },

    });

  },

}));