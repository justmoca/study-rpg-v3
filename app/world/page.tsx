"use client";

import { useRouter } from "next/navigation";

import { worlds } from "@/data/worlds";

import { useWorldStore } from "@/store/worldStore";

import {

  getWorldProgress,

  isWorldComplete,

} from "@/lib/worldManager";

export default function WorldPage() {

  const router = useRouter();

  const {

    currentWorld,

    unlockedWorlds,

    setCurrentWorld,

  } = useWorldStore();

  return (

    <main className="min-h-screen bg-gray-100 p-5">

      <h1 className="text-4xl font-bold mb-8">

        🗺 지역 선택

      </h1>

      <div className="space-y-6">

        {worlds.map((world) => {

          const unlocked =
            unlockedWorlds.includes(world.id);

          const progress =
            getWorldProgress(world.id);

          const completed =
            isWorldComplete(world.id);

          return (

            <div

              key={world.id}

              className={`
  rounded-2xl
  shadow
  p-6
  ${
    currentWorld === world.id

      ? "border-2 border-green-500"

      : "border"
  }
`}

            >

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

              

              <p className="mt-2 font-semibold">

  {

    completed

      ? "🏆 COMPLETE"

      : unlocked

      ? "🟢 OPEN"

      : "🔒 LOCKED"

  }

</p>

              <p className="mt-3 text-gray-600">

                {world.description}

              </p>

              <div className="mt-5">

                <p className="font-semibold">

                  진행도

                </p>

                <div className="w-full h-4 rounded-full bg-gray-200 overflow-hidden mt-2">

                  <div

                    className={`
  h-full
  transition-all
  ${
    completed
      ? "bg-green-500"
      : unlocked
      ? "bg-blue-500"
      : "bg-gray-400"
  }
`}

                    style={{

                      width: `${progress.percent}%`

                    }}

                  />

                </div>

                <p className="mt-2">

                  {progress.killed} / {progress.total}

                  {" · "}

                  {progress.percent}%

                </p>

              </div>

              {
  completed && (

    <div className="mt-4 rounded-xl bg-green-100 border border-green-500 p-3 text-center">

      <div className="text-2xl">

        🏆

      </div>

      <div className="font-bold text-green-700">

        COMPLETE

      </div>

    </div>

  )

}

              <div className="mt-6">

                {unlocked ? (

                  <button

                    onClick={() => {

                      setCurrentWorld(world.id);

                      router.push("/");

                    }}

                    className={`

                      w-full

                      py-3

                      rounded-xl

                      text-white

                      transition

                      ${

                        currentWorld === world.id

                          ? "bg-green-600"

                          : "bg-blue-500 hover:bg-blue-600"

                      }

                    `}

                  >

                    {currentWorld === world.id

                      ? "현재 지역"

                      : "입장"}

                  </button>

                ) : (

                  <button

                    disabled

                    className="w-full py-3 rounded-xl bg-gray-300 text-gray-500"

                  >

                    🔒 LOCKED

                  </button>

                )}

              </div>

            </div>

          );

        })}

      </div>

    </main>

  );

}