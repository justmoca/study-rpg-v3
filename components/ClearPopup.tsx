"use client";

import { useRouter } from "next/navigation";

import { useWorldStore } from "@/store/worldStore";

export default function ClearPopup() {

  const router = useRouter();

  const {

    clearPopup,

    clearedWorldName,

    hideClearPopup,

  } = useWorldStore();

  if (!clearPopup) return null;

  return (

    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

      <div className="bg-white rounded-3xl p-8 w-96 text-center">

        <h2 className="text-4xl font-bold">

          🎉

        </h2>

        <h3 className="text-2xl font-bold mt-4">

          지역 클리어!

        </h3>

        <p className="mt-5 text-xl">

          {clearedWorldName}

        </p>

        <p className="mt-2 text-green-600 font-bold">

          ⭐⭐⭐ COMPLETE ⭐⭐⭐

        </p>

        <p className="mt-6">

          새로운 지역이 해금되었습니다!

        </p>

        <button

          onClick={() => {

            hideClearPopup();

            router.push("/");

          }}

          className="mt-8 w-full py-3 rounded-xl bg-blue-500 hover:bg-blue-600 text-white"

        >

          확인

        </button>

      </div>

    </div>

  );

}