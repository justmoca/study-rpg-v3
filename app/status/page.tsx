"use client";

import BottomNav from "@/components/BottomNav";
import { usePlayerStore } from "@/store/playerStore";

export default function StatusPage() {

  const { player, increaseStat } = usePlayerStore();

  return (

    <main className="min-h-screen bg-gray-100 p-5 pb-24">

      <h1 className="text-3xl font-bold mb-6">
        📊 상태
      </h1>

      <p className="mb-6 text-xl">
        남은 스탯 포인트 : {player.statPoint}
      </p>

      <div className="space-y-4">

        <StatRow
          name="❤️ 체력"
          value={player.stats.hp}
          onClick={() => increaseStat("hp")}
        />

        <StatRow
          name="📚 집중력"
          value={player.stats.focus}
          onClick={() => increaseStat("focus")}
        />

        <StatRow
          name="🔥 의지"
          value={player.stats.will}
          onClick={() => increaseStat("will")}
        />

        <StatRow
          name="⚡ 효율"
          value={player.stats.efficiency}
          onClick={() => increaseStat("efficiency")}
        />

      </div>

      <BottomNav />

    </main>

  );

}

function StatRow({
  name,
  value,
  onClick,
}: {
  name: string;
  value: number;
  onClick: () => void;
}) {

  return (

    <div className="bg-white rounded-xl p-4 flex justify-between items-center shadow">

      <div>

        <p className="font-bold">
          {name}
        </p>

        <p>
          {value}
        </p>

      </div>

      <button
        onClick={onClick}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
      >
        +
      </button>

    </div>

  );

}