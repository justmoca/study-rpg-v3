"use client";

import { useStudyStore } from "@/store/studyStore";
import { formatStudyTime } from "@/lib/time";

export default function TodayStatusCard() {

  const {
    todayStudySeconds,
    goalSeconds,
  } = useStudyStore();
    const percent = Math.min(
    100,
    Math.floor(
      (todayStudySeconds / goalSeconds) * 100
    )
  );

  const remainSeconds = Math.max(
    0,
    goalSeconds - todayStudySeconds
  );

  let status = "";

  if (percent >= 100) {

    status = "🎁 보상을 받을 수 있습니다.";

  } else if (todayStudySeconds === 0) {

    status = "💡 공부를 시작해보세요.";

  } else {

    status = "⚔ 몬스터 처치 가능";

  }

  return (
        <div className="bg-white rounded-2xl shadow p-6 mt-6">

      <h2 className="text-2xl font-bold mb-5">

        📌 오늘의 상태

      </h2>

      <div className="space-y-3">

        <p>

          🎯 목표 진행률 : <b>{percent}%</b>

        </p>

        <p>

          📚 오늘 공부 :{" "}

          <b>{formatStudyTime(todayStudySeconds)}</b>

        </p>

        <p>

          ⏰ 목표까지 :{" "}

          <b>{formatStudyTime(remainSeconds)}</b>

        </p>

      </div>
            <div className="mt-5 rounded-xl bg-gray-100 p-4">

        <p className="font-semibold">

          {status}

        </p>

      </div>
          </div>

  );

}
