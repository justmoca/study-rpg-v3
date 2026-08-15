import { create } from "zustand";
import { usePlayerStore } from "./playerStore";

interface StudyStore {

  isStudying: boolean;

  startTime: number | null;

  studySeconds: number;

  todayStudySeconds: number;

  totalStudySeconds: number;

  offlineStudySeconds: number;

  lastStudyDate: string;

  // 🎯 목표
  goalSeconds: number;

  goalRewardClaimed: boolean;

  // ⏰ 집중 타이머
  focusMinutes: number | null;

  startStudy: () => void;

  endStudy: () => number;

  useStudyTime: (seconds: number) => boolean;

  addOfflineStudy: (seconds: number) => void;

  clearOfflineStudy: () => void;

  checkNewDay: () => void;

  setGoal: (seconds: number) => void;

  claimGoalReward: () => void;

  canClaimGoalReward: () => boolean;

  setFocusMinutes: (minutes: number | null) => void;

}
export const useStudyStore = create<StudyStore>((set, get) => ({

  isStudying: false,

  startTime: null,

  // 테스트용
  studySeconds: 0,

  todayStudySeconds: 0,

  totalStudySeconds: 0,

  offlineStudySeconds: 0,

  lastStudyDate: new Date().toDateString(),

  // 🎯 목표
  goalSeconds: 14400,

  goalRewardClaimed: false,

  // ⏰ 집중 타이머
  focusMinutes: null,

  startStudy: () =>

    set({

      isStudying: true,

      startTime: Date.now(),

    }),

  endStudy: () => {

    const { startTime } = get();

    if (!startTime) return 0;

    const realSeconds = Math.floor(
      (Date.now() - startTime) / 1000
    );

    const focus =
      usePlayerStore.getState().player.stats.focus;

    const earnedSeconds = Math.floor(
      realSeconds * (1 + focus * 0.01)
    );
        set((state) => ({

      isStudying: false,

      startTime: null,

      // 게임에서 사용하는 시간
      studySeconds:
        state.studySeconds + earnedSeconds,

      // 오늘 순공시간
      todayStudySeconds:
        state.todayStudySeconds + realSeconds,

      // 총 순공시간
      totalStudySeconds:
        state.totalStudySeconds + realSeconds,

      // 오프라인 보상
      offlineStudySeconds:
        state.offlineStudySeconds + earnedSeconds,

    }));

    return earnedSeconds;

  },

  useStudyTime: (seconds) => {

    const current = get().studySeconds;

    if (current < seconds) {

      return false;

    }

    set({

      studySeconds: current - seconds,

    });

    return true;

  },

  addOfflineStudy: (seconds) =>

    set((state) => ({

      offlineStudySeconds:
        state.offlineStudySeconds + seconds,

    })),
  clearOfflineStudy: () =>

    set({

      offlineStudySeconds: 0,

    }),

  checkNewDay: () => {

    const today = new Date().toDateString();

    if (today !== get().lastStudyDate) {

      set({

        todayStudySeconds: 0,

        lastStudyDate: today,

        goalRewardClaimed: false,

      });

    }

  },

  setGoal: (seconds) =>

    set({

      goalSeconds: seconds,

    }),
      claimGoalReward: () =>

    set({

      goalRewardClaimed: true,

    }),

  canClaimGoalReward: () => {

    const state = get();

    return (

      state.todayStudySeconds >= state.goalSeconds &&

      !state.goalRewardClaimed

    );

  },

  setFocusMinutes: (minutes) =>

    set({

      focusMinutes: minutes,

    }),
    }));