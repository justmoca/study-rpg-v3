export interface World {

  id: number;

  // 지역 이름
  name: string;

  // 권장 레벨
  minLevel: number;
  maxLevel: number;

  // 지역 설명
  description: string;

  // UI 테마 색상
  themeColor: string;

  // 일반 몬스터 수
  progressGoal: number;

  // 지역 보스 이름
  bossName: string;

  // ---------- v4.1 ----------
  background: string;

  bgm: string;

}

export const worlds: World[] = [

  {
    id: 1,

    name: "🌱 공부의 시작",

    minLevel: 1,
    maxLevel: 15,

    description:
      "게으름과 졸음을 이겨내며 공부 습관을 만드는 첫 번째 지역.",

    themeColor: "#22c55e",

    progressGoal: 3,

    bossName: "나태의 군주",

    background: "study_start",

    bgm: "study_start",
  },

  {
    id: 2,

    name: "📚 학교 복도",

    minLevel: 16,
    maxLevel: 30,

    description:
      "친구들과 수많은 유혹을 이겨내며 집중력을 키우는 공간.",

    themeColor: "#3b82f6",

    progressGoal: 3,

    bossName: "교실의 감시자",

    background: "school",

    bgm: "school",
  },

  {
    id: 3,

    name: "📖 도서관",

    minLevel: 31,
    maxLevel: 50,

    description:
      "조용한 분위기 속에서 긴 집중력을 시험하는 장소.",

    themeColor: "#8b5cf6",

    progressGoal: 3,

    bossName: "침묵의 사서",

    background: "library",

    bgm: "library",
  },

  {
    id: 4,

    name: "📝 시험장",

    minLevel: 51,
    maxLevel: 70,

    description:
      "긴장감 속에서도 끝까지 실력을 발휘해야 하는 시험의 무대.",

    themeColor: "#ef4444",

    progressGoal: 3,

    bossName: "최종 감독관",

    background: "exam",

    bgm: "exam",
  },

  {
    id: 5,

    name: "🌃 야간 자습실",

    minLevel: 71,
    maxLevel: 90,

    description:
      "모두가 집으로 돌아간 뒤 홀로 남아 자신과 싸우는 공간.",

    themeColor: "#f97316",

    progressGoal: 3,

    bossName: "불면의 그림자",

    background: "night",

    bgm: "night",
  },

  {
    id: 6,

    name: "🎓 졸업의 문",

    minLevel: 91,
    maxLevel: 100,

    description:
      "모든 공부를 마친 자만이 도전할 수 있는 마지막 관문.",

    themeColor: "#eab308",

    progressGoal: 3,

    bossName: "지식의 수호자",

    background: "graduation",

    bgm: "graduation",
  },

];