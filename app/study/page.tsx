"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useStudyStore } from "@/store/studyStore";
import { usePlayerStore } from "@/store/playerStore";
import { useInventoryStore } from "@/store/inventoryStore";

import { calculatePlayerStats } from "@/lib/stat";

export default function StudyPage() {

  const router = useRouter();

  const {
  startTime,
  endStudy,
  focusMinutes,
} = useStudyStore();

  const { player } = usePlayerStore();
  const { items } = useInventoryStore();

  const stats = calculatePlayerStats(
    player,
    items
  );

  const [elapsed, setElapsed] = useState(0);

const [remainSeconds, setRemainSeconds] =
  useState<number | null>(null);

  const [timerFinished, setTimerFinished] =
  useState(false);

  const [timerHandled, setTimerHandled] =
  useState(false);

  const appliedTime = Math.floor(
    elapsed * (1 + stats.focus / 100)
  );

  useEffect(() => {

    if (!startTime) return;

    setTimerHandled(false);
setTimerFinished(false);

    const timer = setInterval(() => {

      const sec = Math.floor(
  (Date.now() - startTime) / 1000
);

setElapsed(sec);

const remain =
  focusMinutes !== null
    ? focusMinutes * 60 - sec
    : null;

    console.log({
  sec,
  remain,
  timerFinished,
});

if (remain !== null) {

  setRemainSeconds(
    Math.max(0, remain)
  );

}

if (
  remain !== null &&
  remain <= 0 &&
  !timerHandled
) {

  setTimerFinished(true);
setTimerHandled(true);

}

    }, 1000);

    return () => clearInterval(timer);

  }, [startTime, focusMinutes, timerFinished]);

  function formatTime(seconds: number) {

    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;

    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;

  }

  function handleEnd() {

    const studyTime = endStudy();

    alert(
      `📚 공부 완료!\n\n${Math.floor(studyTime / 60)}분 ${studyTime % 60}초 공부했습니다.`
    );

    router.push("/");

  }

  return (

    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">

      <h1 className="text-4xl font-bold">
        📚 집중 모드
      </h1>

      <h2 className="text-7xl font-bold mt-10">

  {formatTime(appliedTime)}

</h2>

<p className="mt-2 text-sm text-gray-400">

  (집중력 적용)

</p>

{focusMinutes !== null && (

  <div className="mt-8 text-center">

    <p className="text-gray-400">

      ⏰ 남은 집중 시간

    </p>

    <h3 className="text-5xl font-bold text-yellow-400 mt-2">

      {formatTime(remainSeconds ?? 0)}

    </h3>

  </div>

)}

      <div className="mt-12 flex flex-col items-center">

        <p className="text-sm text-gray-400">
          순공시간
        </p>

        <h3 className="text-3xl font-bold mt-2">
          {formatTime(elapsed)}
        </h3>

      </div>

    {timerFinished && (

  <div className="fixed inset-0 bg-black/60 flex items-center justify-center">

    <div className="bg-white text-black rounded-2xl p-8 w-96">

      <h2 className="text-2xl font-bold">

        ⏰ 집중 시간이 끝났습니다!

      </h2>

      <p className="mt-3">

        공부를 종료하시겠습니까?

      </p>

      <div className="flex gap-3 mt-6">

        <button

          onClick={handleEnd}

          className="flex-1 bg-red-500 text-white py-3 rounded-xl"

        >

          공부 종료

        </button>

        <button

          onClick={() => {

  setTimerFinished(false);

}}

          className="flex-1 bg-blue-500 text-white py-3 rounded-xl"

        >

          계속 공부

        </button>

      </div>

    </div>

  </div>

)}

      <button
        onClick={handleEnd}
        className="mt-20 bg-red-500 hover:bg-red-600 px-8 py-4 rounded-xl text-2xl font-bold transition"
      >
        공부 종료
      </button>

    </main>

  );

}