"use client";

import { Monster } from "@/types/monster";
import { usePlayerStore } from "@/store/playerStore";
import { useStudyStore } from "@/store/studyStore";
import { useInventoryStore } from "@/store/inventoryStore";
import { calculatePlayerStats } from "@/lib/stat";
import { battle } from "@/lib/battle";
import { useWorldStore } from "@/store/worldStore";
import { completeCurrentWorld } from "@/lib/worldManager";

function formatTime(seconds: number) {

  const h = Math.floor(seconds / 3600);

  const m = Math.floor((seconds % 3600) / 60);

  const s = seconds % 60;

  if (h > 0) {

    return `${h}시간 ${m}분 ${s}초`;

  }

  if (m > 0) {

    return `${m}분 ${s}초`;

  }

  return `${s}초`;

}

interface Props {
  monster: Monster;
}

export default function MonsterCard({ monster }: Props) {

  const { player, gainExp, gainGold } = usePlayerStore();
  const { items } = useInventoryStore();

  const {
    studySeconds,
    useStudyTime,
  } = useStudyStore();

  const {

  killMonster,



} = useWorldStore();


  const stats = calculatePlayerStats(
    player,
    items
  );

  // ❤️ 체력 (최대 50%)
  const reduction = Math.min(
    stats.hp * 0.01,
    0.5
  );

  const needTime = Math.floor(
    monster.needStudyTime * (1 - reduction)
  );

  // 🔥 의지
  const gold = Math.floor(
    monster.gold * (1 + stats.will * 0.01)
  );

  // ⚡ 효율
  const exp = Math.floor(
    monster.exp * (1 + stats.efficiency * 0.01)
  );

  function handleBattle() {

    const result = battle(
      monster,
      player,
      items,
      studySeconds
    );

    if (!result.success) {
      alert(result.message);
      
      
      
      return;

    }

    useStudyTime(result.needTime);

gainExp(result.exp);

gainGold(result.gold);

killMonster(monster.id);

if (monster.isBoss) {

  completeCurrentWorld();

}

alert(
  `🎉 ${monster.name} 처치!\n\n+${result.exp} EXP\n+${result.gold} Gold`
);

  }

  return (

    <div className="bg-white rounded-2xl shadow-md p-5 mb-4">

      <div className="flex justify-between items-center">

        <div>

          <h2 className="text-2xl font-bold">
            👾 {monster.name}
          </h2>

          <p className="text-gray-600 mt-2">
            필요 공부시간 : {formatTime(needTime)}
          </p>

          <p className="text-blue-600">
            EXP +{exp}
          </p>

          <p className="text-yellow-600">
            Gold +{gold}
          </p>

        </div>

        <button
  onClick={handleBattle}
  className="
    bg-red-500
    hover:bg-red-600
    text-white
    px-6
    py-3
    rounded-xl
    font-bold
  "
>
  처치
</button>


      </div>

    </div>

  );

}