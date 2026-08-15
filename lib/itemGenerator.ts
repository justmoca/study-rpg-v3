import { Item, ItemGrade, ItemType } from "@/types/item";

const weaponNames = [
  "연필",
  "샤프",
  "만년필",
  "형광펜",
  "태블릿",
];

const armorNames = [
  "교복",
  "체육복",
  "후드집업",
  "독서실 의자",
  "집중 헤드셋",
];

const accessoryNames = [
  "암기노트",
  "오답노트",
  "합격 부적",
  "영단어 카드",
];

const gradePrefix: Record<ItemGrade, string> = {
  common: "낡은",
  uncommon: "잘 관리된",
  rare: "프리미엄",
  epic: "명품",
  legendary: "황금",
  mythic: "전설의",
};

const grades: ItemGrade[] = [
  "common",
  "uncommon",
  "rare",
  "epic",
  "legendary",
  "mythic",
];

const statList = [
  "hp",
  "focus",
  "efficiency",
  "will",
] as const;

function random<T>(array: readonly T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function randomType(): ItemType {
  return random([
    "weapon",
    "armor",
    "accessory",
  ] as const);
}

function randomName(type: ItemType) {

  switch (type) {

    case "weapon":
      return random(weaponNames);

    case "armor":
      return random(armorNames);

    case "accessory":
      return random(accessoryNames);

  }

}

function optionCount(grade: ItemGrade) {

  switch (grade) {

    case "common":
      return 1;

    case "uncommon":
      return 1;

    case "rare":
      return 2;

    case "epic":
      return 2;

    case "legendary":
      return 3;

    case "mythic":
      return 4;

  }

}

function statRange(grade: ItemGrade) {

  switch (grade) {

    case "common":
      return [1, 3];

    case "uncommon":
      return [3, 6];

    case "rare":
      return [6, 10];

    case "epic":
      return [10, 16];

    case "legendary":
      return [16, 24];

    case "mythic":
      return [24, 40];

  }

}

export function generateItem(): Item {

  const type = randomType();

  const grade = random(grades);

  const name = randomName(type);

  const [min, max] = statRange(grade);

  const count = optionCount(grade);

  const stats: Item["stats"] = {};

  const shuffled = [...statList].sort(
    () => Math.random() - 0.5
  );

  for (let i = 0; i < count; i++) {

    stats[shuffled[i]] =
      Math.floor(
        Math.random() * (max - min + 1)
      ) + min;

  }

  return {

    id: Date.now(),

    name: `${gradePrefix[grade]} ${name}`,

    type,

    grade,

    stats,

  };

}