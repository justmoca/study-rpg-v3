import { create } from "zustand";

interface WorldStore {

  currentWorld: number;

  unlockedWorlds: number[];

  clearedWorlds: number[];

  killedMonsters: number[];

  // 지역 클리어 팝업
  clearPopup: boolean;

  clearedWorldName: string;

  setCurrentWorld: (worldId: number) => void;

  killMonster: (monsterId: number) => void;

  clearWorld: (worldId: number) => void;

  unlockWorld: (worldId: number) => void;

  unlockNextWorld: () => void;

  isMonsterKilled: (monsterId: number) => boolean;


  isWorldCleared: (worldId: number) => boolean;

  showClearPopup: (worldName: string) => void;

  hideClearPopup: () => void;
  

}

export const useWorldStore = create<WorldStore>((set, get) => ({

  currentWorld: 1,

  unlockedWorlds: [1],

  clearedWorlds: [],

  killedMonsters: [],

  clearPopup: false,

  clearedWorldName: "",

  setCurrentWorld: (worldId) =>

    set({

      currentWorld: worldId,

    }),

  killMonster: (monsterId) =>

    set((state) => ({

      killedMonsters: state.killedMonsters.includes(monsterId)

        ? state.killedMonsters

        : [...state.killedMonsters, monsterId],

    })),

  clearWorld: (worldId) =>

    set((state) => ({

      clearedWorlds: state.clearedWorlds.includes(worldId)

        ? state.clearedWorlds

        : [...state.clearedWorlds, worldId],

    })),

  unlockWorld: (worldId) =>

    set((state) => ({

      unlockedWorlds: state.unlockedWorlds.includes(worldId)

        ? state.unlockedWorlds

        : [...state.unlockedWorlds, worldId],

    })),

    isMonsterKilled: (monsterId) =>

  get().killedMonsters.includes(monsterId),

  unlockNextWorld: () => {

    const current = get().currentWorld;

    const next = current + 1;

    if (!get().unlockedWorlds.includes(next)) {

      set((state) => ({

        unlockedWorlds: [

          ...state.unlockedWorlds,

          next,

        ],

      }));

    }

  },

  isWorldCleared: (worldId) =>

    get().clearedWorlds.includes(worldId),

  showClearPopup: (worldName) =>

    set({

      clearPopup: true,

      clearedWorldName: worldName,

    }),

  hideClearPopup: () =>

    set({

      clearPopup: false,

      clearedWorldName: "",

    }),

}));