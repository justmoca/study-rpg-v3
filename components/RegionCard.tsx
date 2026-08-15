"use client";

import { useRouter } from "next/navigation";

import { useWorldStore } from "@/store/worldStore";

import {
  getCurrentWorld,
  getCurrentBoss,
  getNextMonster,
  getWorldProgress,
  getProgressText,
  isBossUnlocked,
  isWorldComplete,
} from "@/lib/worldManager";

function formatTime(seconds: number) {

  const h = Math.floor(seconds / 3600);

  const m = Math.floor((seconds % 3600) / 60);

  const s = seconds % 60;

  if (h > 0) {

    return `${h}시간 ${m}분`;

  }

  if (m > 0) {

    return `${m}분`;

  }

  return `${s}초`;

}

export default function RegionCard() {

  const router = useRouter();

  const {

    currentWorld,

  } = useWorldStore();

  const world =
    getCurrentWorld(currentWorld);

  const progress =
    getWorldProgress(currentWorld);

  const boss =
    getCurrentBoss(currentWorld);

  const nextMonster =
    getNextMonster(currentWorld);

  const bossUnlocked =
    isBossUnlocked(currentWorld);

  const completed =
    isWorldComplete(currentWorld);

  if (!world) return null;

  return (

    <div className="bg-white rounded-2xl shadow p-6 mt-6">

      <h2
  className="text-2xl font-bold"
  style={{
    color: world.themeColor,
  }}
>
  {world.name}
</h2>

      <p className="text-gray-500 mt-1">

        Lv.{world.minLevel} ~ Lv.{world.maxLevel}

      </p>

      <div className="border-t my-5"></div>

      <h3 className="font-bold">

        📖 지역 설명

      </h3>

      <p className="text-gray-600 mt-2">

        {world.description}

      </p>

      <div className="border-t my-5"></div>

      <h3 className="font-bold">

        🎯 다음 목표

      </h3>

      {nextMonster ? (

        <>

          <p className="mt-2">

            ⚔ {nextMonster.name}

          </p>

          <p className="text-sm text-gray-500">

            📚 필요 공부

            {" "}

            {formatTime(nextMonster.needStudyTime)}

          </p>

        </>

      ) : (

        <p className="mt-2 text-green-600">

          모든 일반 몬스터 처치 완료!

        </p>

      )}

      <div className="border-t my-5"></div>

      <h3 className="font-bold">

        👑 지역 보스

      </h3>

      <p className="mt-2">

        {boss?.name}

      </p>

      <p className="text-sm mt-1">

        {

          completed

            ? "🏆 처치 완료"

            : bossUnlocked

            ? "⚔ 도전 가능"

            : "🔒 잠겨있음"

        }

      </p>

      <div className="border-t my-5"></div>

      <h3 className="font-bold">

        📊 진행도

      </h3>

      <p className="mt-2">

        {getProgressText(currentWorld)}

      </p>

      <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden mt-3">

        <div
  className={`
    h-full
    transition-all
    ${
      completed
        ? "bg-green-500"
        : bossUnlocked
        ? "bg-yellow-500"
        : "bg-blue-500"
    }
  `}
  style={{
    width: `${progress.percent}%`,
  }}
/>

      </div>

     <p className="text-center mt-2 font-bold">

  {progress.killed} / {progress.total} 처치

</p>

      {
  completed && (

    <div className="mt-5 rounded-xl bg-green-100 border border-green-500 p-4 text-center">

      <div className="text-3xl">

        🏆

      </div>

      <div className="font-bold text-green-700 mt-2">

        COMPLETE

      </div>

      <div className="text-sm text-gray-600 mt-1">

        다음 지역으로 이동할 수 있습니다.

      </div>

    </div>

  )
}

      <button

        onClick={() => router.push("/world")}

        className="mt-6 w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl transition"

      >

        🗺 지역 이동

      </button>

    </div>

  );

}