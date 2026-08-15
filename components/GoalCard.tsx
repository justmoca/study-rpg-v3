"use client";

import { useState } from "react";

import { useStudyStore } from "@/store/studyStore";
import { usePlayerStore } from "@/store/playerStore";

import { formatStudyTime } from "@/lib/time";

export default function GoalCard() {

  const {
    todayStudySeconds,
    goalSeconds,
    goalRewardClaimed,
    canClaimGoalReward,
    claimGoalReward,
    setGoal,
  } = useStudyStore();

  const {
    gainExp,
    gainGold,
  } = usePlayerStore();
    const [open, setOpen] = useState(false);

  const goals = [
    1800,
    3600,
    7200,
    14400,
    21600,
    28800,
  ];

  const percent = Math.min(
    100,
    Math.floor(
      (todayStudySeconds / goalSeconds) * 100
    )
  );

  const rewardExp = Math.floor(goalSeconds / 9);

  const rewardGold = Math.floor(goalSeconds / 6);

  const color =
    percent >= 100
      ? "bg-green-500"
      : "bg-blue-500";

  function handleReward() {

    if (!canClaimGoalReward()) return;

    gainExp(rewardExp);

    gainGold(rewardGold);

    claimGoalReward();

    alert(
      `🎉 목표 달성!\n\n+${rewardExp} EXP\n+${rewardGold} Gold`
    );

  }

  return (
        <div className="bg-white rounded-2xl shadow p-6 mt-6">

      <h2 className="text-2xl font-bold mb-5">
        🎯 오늘의 목표
      </h2>

      <div className="w-full h-5 bg-gray-200 rounded-full overflow-hidden">

        <div
          className={`${color} h-full transition-all duration-500`}
          style={{
            width: `${percent}%`,
          }}
        />

      </div>

      <div className="mt-4">

        <p className="text-lg font-semibold">

          {formatStudyTime(todayStudySeconds)}

          {" / "}

          {formatStudyTime(goalSeconds)}

        </p>

        <p className="text-gray-500 mt-1">

          진행률 {percent}%

        </p>

      </div>

      {percent >= 100 ? (

        <p className="mt-4 text-green-600 font-bold">

          🎉 오늘 목표를 달성했습니다!

        </p>

      ) : (

        <p className="mt-4 text-gray-600">

          목표까지{" "}

          {formatStudyTime(
            Math.max(0, goalSeconds - todayStudySeconds)
          )}

          남았습니다.

        </p>

      )}
            <button
        onClick={() => setOpen(!open)}
        className="
          mt-5
          w-full
          bg-blue-500
          hover:bg-blue-600
          text-white
          py-3
          rounded-xl
          font-bold
          transition
        "
      >
        ⚙ 목표 변경
      </button>

      {open && (

        <div className="mt-4 space-y-2">

          {goals.map((goal) => (

            <button
              key={goal}
              onClick={() => {

                setGoal(goal);

                setOpen(false);

              }}
              className="
                w-full
                py-2
                rounded-lg
                border
                hover:bg-gray-100
              "
            >

              {goal === goalSeconds
  ? `✅ ${formatStudyTime(goal)}`
  : formatStudyTime(goal)}

            </button>

          ))}

        </div>

      )}
            {canClaimGoalReward() && !goalRewardClaimed && (

        <button
          onClick={handleReward}
          className="
            mt-4
            w-full
            bg-green-500
            hover:bg-green-600
            text-white
            py-3
            rounded-xl
            font-bold
            transition
          "
        >
          🎁 보상 받기
        </button>

      )}

      {goalRewardClaimed && (

        <p className="mt-4 text-center text-green-600 font-bold">

          ✅ 오늘 보상 수령 완료

        </p>

      )}
          </div>

  );

}