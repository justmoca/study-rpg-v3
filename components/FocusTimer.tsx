"use client";

import { useStudyStore } from "@/store/studyStore";

export default function FocusTimer() {

  const {
    focusMinutes,
    setFocusMinutes,
  } = useStudyStore();

  const timers = [
    25,
    50,
    90,
  ];

  return (

    <div className="bg-white rounded-2xl shadow p-6 mt-6">

      <h2 className="text-2xl font-bold mb-5">

        ⏰ 집중 타이머

      </h2>

      <div className="grid grid-cols-2 gap-3">
              {timers.map((minute) => (

          <button
            key={minute}
            onClick={() => setFocusMinutes(minute)}
            className={`
              py-3
              rounded-xl
              border
              transition
              ${
                focusMinutes === minute
                  ? "bg-blue-500 text-white border-blue-500"
                  : "hover:bg-gray-100"
              }
            `}
          >

            {minute}분

          </button>

        ))}

        <button
          onClick={() => setFocusMinutes(null)}
          className={`
            py-3
            rounded-xl
            border
            transition
            ${
              focusMinutes === null
                ? "bg-green-500 text-white border-green-500"
                : "hover:bg-gray-100"
            }
          `}
        >

          ♾ 자유모드

        </button>

      </div>
            <p className="mt-5 text-center text-gray-600">

        현재 선택 :

        <span className="font-bold ml-2">

          {focusMinutes === null
            ? "자유모드"
            : `${focusMinutes}분`}

        </span>

      </p>

    </div>

  );

}