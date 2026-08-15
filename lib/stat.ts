import { Item } from "@/types/item";
import { Player } from "@/types/player";

export function calculatePlayerStats(
  player: Player,
  items: Item[]
) {

  const result = {

    hp: player.stats.hp,

    focus: player.stats.focus,

    will: player.stats.will,

    efficiency: player.stats.efficiency,

  };

  const equippedItems = items.filter(item =>

    player.equipped.weapon === item.id ||

    player.equipped.armor === item.id ||

    player.equipped.accessory === item.id

  );

  equippedItems.forEach(item => {

    if (item.stats.hp)
      result.hp += item.stats.hp;

    if (item.stats.focus)
      result.focus += item.stats.focus;

    if (item.stats.will)
      result.will += item.stats.will;

    if (item.stats.efficiency)
      result.efficiency += item.stats.efficiency;

  });

  return result;

}