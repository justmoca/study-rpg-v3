export interface Player {
  uid: string;
  nickname: string;

  level: number;
  exp: number;
  expToNext: number;

  gold: number;

  totalStudySeconds: number;

  statPoint: number;

  stats: {
    hp: number;
    focus: number;
    efficiency: number;
    will: number;
  };

  inventory: number[];

  equipped: {
    weapon: number | null;
    armor: number | null;
    accessory: number | null;
  };
}