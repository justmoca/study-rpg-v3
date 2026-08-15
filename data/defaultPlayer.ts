import { Player } from "@/types/player";

export const defaultPlayer: Player = {
  uid: "",

  nickname: "용사",

  level: 1,

  exp: 0,

  expToNext: 100,

  gold: 0,

  totalStudySeconds: 0,

  statPoint: 0,

  stats: {
    hp: 0,
    focus: 0,
    efficiency: 0,
    will: 0,
  },

  inventory: [],

  equipped: {
    weapon: null,
    armor: null,
    accessory: null,
  },
};