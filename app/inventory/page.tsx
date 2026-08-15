"use client";

import BottomNav from "@/components/BottomNav";
import { useInventoryStore } from "@/store/inventoryStore";
import { usePlayerStore } from "@/store/playerStore";

export default function InventoryPage() {

  const {
    items,
    equipItem,
  } = useInventoryStore();

  const { player } = usePlayerStore();

  return (

    <main className="min-h-screen bg-gray-100 p-5 pb-24">

      <h1 className="text-3xl font-bold mb-6">
        🎒 인벤토리
      </h1>

      {items.length === 0 ? (

        <div className="bg-white rounded-xl p-8 text-center shadow">

          <p className="text-gray-500">
            아이템이 없습니다.
          </p>

        </div>

      ) : (

        <div className="space-y-4">

          {items.map((item) => {

            const equipped =
              player.equipped[item.type] === item.id;

            return (

              <div
                key={item.id}
                className="bg-white rounded-xl shadow p-5"
              >

                <div className="flex justify-between">

                  <div>

                    <h2 className="text-xl font-bold">

                      {item.name}

                    </h2>

                    <p className="text-gray-500">

                      {item.grade.toUpperCase()}

                    </p>

                    <p>

                      종류 :
                      {item.type === "weapon"
                        ? " 무기"
                        : item.type === "armor"
                        ? " 방어구"
                        : " 장신구"}

                    </p>

                    {item.stats.hp && (
                      <p>❤️ 체력 +{item.stats.hp}</p>
                    )}

                    {item.stats.focus && (
                      <p>📚 집중력 +{item.stats.focus}</p>
                    )}

                    {item.stats.luck && (
                      <p>🍀 행운 +{item.stats.luck}</p>
                    )}

                    {item.stats.will && (
                      <p>🔥 의지 +{item.stats.will}</p>
                    )}

                  </div>

                  <div className="flex items-center">

                    {equipped ? (

                      <button
                        className="
                        bg-gray-400
                        text-white
                        px-5
                        py-2
                        rounded-lg
                        "
                        disabled
                      >

                        장착중

                      </button>

                    ) : (

                      <button
                        onClick={() =>
                          equipItem(item.id)
                        }
                        className="
                        bg-blue-500
                        hover:bg-blue-600
                        text-white
                        px-5
                        py-2
                        rounded-lg
                        "
                      >

                        장착

                      </button>

                    )}

                  </div>

                </div>

              </div>

            );

          })}

        </div>

      )}

      <BottomNav />

    </main>

  );

}