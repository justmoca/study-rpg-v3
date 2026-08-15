import { monsters } from "@/data/monsters";
import { worlds } from "@/data/worlds";
import { useWorldStore } from "@/store/worldStore";

// 현재 지역 정보
export function getCurrentWorld(worldId: number) {

  return worlds.find(

    world => world.id === worldId

  );

}

// 일반 몬스터
export function getCurrentWorldMonsters(worldId: number) {

  return monsters.filter(

    monster =>

      monster.worldId === worldId &&

      !monster.isBoss

  );

}

// 보스
export function getCurrentBoss(worldId: number) {

  return monsters.find(

    monster =>

      monster.worldId === worldId &&

      monster.isBoss

  );

}

// 진행도
export function getWorldProgress(worldId: number) {

  const normalMonsters =
    getCurrentWorldMonsters(worldId);

  const { isMonsterKilled } =
    useWorldStore.getState();

  const killed = normalMonsters.filter(

    monster =>

      isMonsterKilled(monster.id)

  ).length;

  return {

    killed,

    total: normalMonsters.length,

    percent:

      normalMonsters.length === 0

        ? 0

        : Math.floor(

            (killed / normalMonsters.length) * 100

          ),

  };

}

// 진행도 문자열
export function getProgressText(worldId: number) {

  const progress = getWorldProgress(worldId);

  return `${progress.killed} / ${progress.total}`;

}

// 다음 목표 몬스터
export function getNextMonster(worldId: number) {

  const normalMonsters =
    getCurrentWorldMonsters(worldId);

  const { isMonsterKilled } =
    useWorldStore.getState();

  return normalMonsters.find(

    monster =>

      !isMonsterKilled(monster.id)

  );

}

// 보스 등장
export function isBossUnlocked(worldId: number) {

  const progress =
    getWorldProgress(worldId);

  return progress.killed === progress.total;

}

// 지역 완료 여부
export function isWorldComplete(worldId: number) {

  const { isWorldCleared } =
    useWorldStore.getState();

  return isWorldCleared(worldId);

}

// 지역 완료 처리
export function completeCurrentWorld() {

  const {

    currentWorld,

    clearWorld,

    unlockNextWorld,

    showClearPopup,

  } = useWorldStore.getState();

  const world =
    getCurrentWorld(currentWorld);

  clearWorld(currentWorld);

  unlockNextWorld();

  showClearPopup(

    world?.name ?? ""

  );

  

}

export function shouldShowBoss(worldId: number) {

  const boss =
    getCurrentBoss(worldId);

  if (!boss) return false;

  const {

    isMonsterKilled,

  } = useWorldStore.getState();

  return (

    isBossUnlocked(worldId) &&

    !isMonsterKilled(boss.id)

  );

}