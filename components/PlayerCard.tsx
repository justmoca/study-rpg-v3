"use client";

import { usePlayerStore } from "@/store/playerStore";
import { useStudyStore } from "@/store/studyStore";
import { useInventoryStore } from "@/store/inventoryStore";
import { calculatePlayerStats } from "@/lib/stat";

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


export default function PlayerCard() {

  const { player } = usePlayerStore();

  const {
    studySeconds,
    totalStudySeconds,
  } = useStudyStore();

  const { items } = useInventoryStore();

  const stats = calculatePlayerStats(
    player,
    items
  );

  const weapon = items.find(
    item => item.id === player.equipped.weapon
  );

  const armor = items.find(
    item => item.id === player.equipped.armor
  );

  const accessory = items.find(
    item => item.id === player.equipped.accessory
  );

  return (

    <div className="bg-white rounded-2xl shadow p-6">

      <h2 className="text-2xl font-bold mb-4">
        👤 {player.nickname}
      </h2>

      <div className="space-y-2">

        <p>
          ⭐ Level {player.level}
        </p>

        <p>
          EXP {player.exp} / {player.expToNext}
        </p>

        <p>
          💰 Gold : {player.gold}
        </p>

        <p>
          📖 공부 가능 시간 : {formatTime(studySeconds)}
        </p>

        <p>
          🕒 총 공부시간 : {formatTime(studySeconds)}
        </p>

      </div>

      <hr className="my-5" />

      <h3 className="font-bold mb-2">
        📊 능력치
      </h3>

      <div className="space-y-1">

        <p>
          ❤️ 체력 : {stats.hp} (최대 50%)
        </p>

        <p>
          📚 집중력 : {stats.focus}
        </p>

        <p>
          🔥 의지 : {stats.will}
        </p>

        <p>
          ⚡ 효율 : {stats.efficiency}
        </p>

      </div>

      <hr className="my-5" />

      <h3 className="font-bold mb-2">
        ⚔️ 장착 장비
      </h3>

      <div className="space-y-2">

        <p>
          ✏️ 무기 : {weapon ? weapon.name : "없음"}
        </p>

        <p>
          👕 방어구 : {armor ? armor.name : "없음"}
        </p>

        <p>
          💍 장신구 : {accessory ? accessory.name : "없음"}
        </p>

      </div>

    </div>

  );

}