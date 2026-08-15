import { create } from "zustand";
import { Player } from "@/types/player";
import { defaultPlayer } from "@/data/defaultPlayer";

interface PlayerStore {
  player: Player;

  setPlayer: (player: Player) => void;

  gainExp: (exp: number) => void;

  gainGold: (gold: number) => void;

  spendGold: (gold: number) => boolean;

  addStatPoint: (point: number) => void;

  increaseStat: (
    stat: "hp" | "focus" | "efficiency" | "will"
  ) => boolean;
}

export const usePlayerStore = create<PlayerStore>((set, get) => ({

  player: defaultPlayer,

  setPlayer: (player) => set({ player }),

  gainExp: (exp) =>
    set((state) => {

      const player = { ...state.player };

      player.exp += exp;

      while (player.exp >= player.expToNext) {

        player.exp -= player.expToNext;

        player.level++;

        player.statPoint += 4;

        player.expToNext = Math.floor(
          player.expToNext * 1.2
        );

      }

      return { player };

    }),

  gainGold: (gold) =>
    set((state) => ({

      player: {

        ...state.player,

        gold: state.player.gold + gold,

      },

    })),

  spendGold: (gold) => {

    const player = get().player;

    if (player.gold < gold) {

      return false;

    }

    set({

      player: {

        ...player,

        gold: player.gold - gold,

      },

    });

    return true;

  },

  addStatPoint: (point) =>
    set((state) => ({

      player: {

        ...state.player,

        statPoint: state.player.statPoint + point,

      },

    })),

  increaseStat: (stat) => {

    const player = get().player;

    if (player.statPoint <= 0) {

      return false;

    }

    if (stat === "efficiency" && player.stats.efficiency >= 50) {

      return false;

    }

    if (stat === "hp" && player.stats.hp >= 50) {

      return false;

    }

    if (stat === "will" && player.stats.will >= 100) {

      return false;

    }

    set({

      player: {

        ...player,

        statPoint: player.statPoint - 1,

        stats: {

          ...player.stats,

          [stat]: player.stats[stat] + 1,

        },

      },

    });

    return true;

  },

}));