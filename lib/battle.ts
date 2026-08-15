import { Monster } from "@/types/monster";
import { Player } from "@/types/player";
import { Item } from "@/types/item";
import { calculatePlayerStats } from "./stat";

export interface BattleResult {
  success: boolean;
  message: string;
  needTime: number;
  exp: number;
  gold: number;
}

export function battle(
  monster: Monster,
  player: Player,
  items: Item[],
  studySeconds: number
): BattleResult {

  const stats = calculatePlayerStats(
    player,
    items
  );

  // ❤️ 체력
  const reduction = Math.min(
    stats.hp * 0.01,
    0.5
  );

  const needTime = Math.floor(
    monster.needStudyTime * (1 - reduction)
  );

  if (studySeconds < needTime) {

    return {
      success: false,
      message: "공부시간이 부족합니다.",
      needTime: 0,
      exp: 0,
      gold: 0,
    };

  }

  // 🔥 의지
  const goldBonus =
    1 + stats.will * 0.01;

  // ⚡ 효율
  const expBonus =
    1 + stats.efficiency * 0.01;

  return {

    success: true,

    message: "처치 성공!",

    needTime,

    exp: Math.floor(
      monster.exp * expBonus
    ),

    gold: Math.floor(
      monster.gold * goldBonus
    ),

  };

}