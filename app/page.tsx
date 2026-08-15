"use client";

import ClearPopup from "@/components/ClearPopup";
import { useWorldStore } from "@/store/worldStore";
import PlayerCard from "@/components/PlayerCard";
import GoalCard from "@/components/GoalCard";
import StudyButton from "@/components/StudyButton";
import MonsterCard from "@/components/MonsterCard";
import TodayStatusCard from "@/components/TodayStatusCard";
import BottomNav from "@/components/BottomNav";
import FocusTimer from "@/components/FocusTimer";
import {
  getCurrentWorldMonsters,
  getCurrentBoss,
  shouldShowBoss,
} from "@/lib/worldManager";
import RegionCard from "@/components/RegionCard";

export default function Home() {

  const { currentWorld } = useWorldStore();

const currentMonsters =
  getCurrentWorldMonsters(currentWorld);

const boss =
  getCurrentBoss(currentWorld);

const showBoss =
  shouldShowBoss(currentWorld);

  return (

    <main className="min-h-screen bg-gray-100 p-5 pb-24">

      <h1 className="text-4xl font-bold mb-6">
        📚 Study RPG
      </h1>

 <PlayerCard />

<RegionCard />

<TodayStatusCard />

 <GoalCard />

<FocusTimer />

<div className="mt-6">
  <StudyButton />
</div>

      <h2 className="text-3xl font-bold mt-10 mb-5">
        👾 몬스터
      </h2>

      {currentMonsters.map((monster) => (

  <MonsterCard
    key={monster.id}
    monster={monster}
  />

))}

{showBoss && boss && (

  <>

    <h2 className="text-3xl font-bold mt-10 mb-5">

      👑 지역 보스

    </h2>

    <MonsterCard
      monster={boss}
    />

  </>

)}

    
<ClearPopup />

<BottomNav />



    </main>

  );

}