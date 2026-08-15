"use client";


import { generateItem } from "@/lib/itemGenerator";
import { useInventoryStore } from "@/store/inventoryStore";
import BottomNav from "@/components/BottomNav";
import { usePlayerStore } from "@/store/playerStore";

export default function ShopPage() {

  const { addItem } = useInventoryStore();  
  const { player, spendGold } = usePlayerStore();

 function buyNormalBox() {

  if (!spendGold(100)) {

    alert("Gold가 부족합니다.");

    return;

  }

  const item = generateItem();

  addItem(item);

  alert(`${item.name} 획득!`);

}

  function buyAdvancedBox() {

  if (!spendGold(500)) {

    alert("Gold가 부족합니다.");

    return;

  }

  const item = generateItem();

  addItem(item);

  alert(`${item.name} 획득!`);

}

  function buyRareBox() {

  if (!spendGold(1000)) {

    alert("Gold가 부족합니다.");

    return;

  }

  const item = generateItem();

  addItem(item);

  alert(`${item.name} 획득!`);

}

  return (

    <main className="min-h-screen bg-gray-100 p-5 pb-24">

      <h1 className="text-3xl font-bold mb-6">

        🛒 상점

      </h1>

      <p className="text-xl mb-6">

        💰 보유 Gold : {player.gold}

      </p>

      <div className="space-y-4">

        <ShopCard
          title="📦 일반 상자"
          price={100}
          onClick={buyNormalBox}
        />

        <ShopCard
          title="🎁 고급 상자"
          price={500}
          onClick={buyAdvancedBox}
        />

        <ShopCard
          title="💎 희귀 상자"
          price={1000}
          onClick={buyRareBox}
        />

      </div>

      <BottomNav />

    </main>

  );

}

function ShopCard({
  title,
  price,
  onClick,
}: {
  title: string;
  price: number;
  onClick: () => void;
}) {

  return (

    <div className="bg-white rounded-xl shadow p-5 flex justify-between items-center">

      <div>

        <h2 className="text-xl font-bold">
          {title}
        </h2>

        <p>
          가격 : {price} Gold
        </p>

      </div>

      <button
        onClick={onClick}
        className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-lg font-bold"
      >
        구매
      </button>

    </div>

  );

}