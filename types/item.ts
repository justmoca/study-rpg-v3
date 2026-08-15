export type ItemType =
  | "weapon"
  | "armor"
  | "accessory";

export type ItemGrade =
  | "common"
  | "uncommon"
  | "rare"
  | "epic"
  | "legendary"
  | "mythic";

export interface Item {

  id: number;

  name: string;

  type: ItemType;

  grade: ItemGrade;

  stats: {

    hp?: number;

    focus?: number;

    efficiency?: number;

    will?: number;

  };

}