"use client";

import { useRouter } from "next/navigation";
import { useStudyStore } from "@/store/studyStore";

export default function StudyButton() {

  const router = useRouter();

  const {
    startStudy,
    focusMinutes,
  } = useStudyStore();

  function handleStart() {

    startStudy();

    console.log("선택된 집중 시간 :", focusMinutes);

    router.push("/study");

  }

  return (

    <button
      onClick={handleStart}
      className="
        w-full
        h-32
        rounded-2xl
        bg-blue-600
        hover:bg-blue-700
        text-white
        text-3xl
        font-bold
        shadow-lg
        transition
      "
    >

      📚 공부 시작

    </button>

  );

}