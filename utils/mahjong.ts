
export type TileType = 'man' | 'pin' | 'sou' | 'honors';

export interface Tile {
  id: string; // unique id for React keys
  value: string; // 1-9 for suites, 1-7 for honors
  type: TileType;
  symbol: string; // standard notation e.g. 1m, 5p, 1z
  label: string; // Unicode character
}

export const TILES: Omit<Tile, 'id'>[] = [
  // Man (Characters)
  { value: '1', type: 'man', symbol: '1m', label: '🀇' },
  { value: '2', type: 'man', symbol: '2m', label: '🀈' },
  { value: '3', type: 'man', symbol: '3m', label: '🀉' },
  { value: '4', type: 'man', symbol: '4m', label: '🀊' },
  { value: '5', type: 'man', symbol: '5m', label: '🀋' },
  { value: '6', type: 'man', symbol: '6m', label: '🀌' },
  { value: '7', type: 'man', symbol: '7m', label: '🀍' },
  { value: '8', type: 'man', symbol: '8m', label: '🀎' },
  { value: '9', type: 'man', symbol: '9m', label: '🀏' },

  // Pin (Circles)
  { value: '1', type: 'pin', symbol: '1p', label: '🀙' },
  { value: '2', type: 'pin', symbol: '2p', label: '🀚' },
  { value: '3', type: 'pin', symbol: '3p', label: '🀛' },
  { value: '4', type: 'pin', symbol: '4p', label: '🀜' },
  { value: '5', type: 'pin', symbol: '5p', label: '🀝' },
  { value: '6', type: 'pin', symbol: '6p', label: '🀞' },
  { value: '7', type: 'pin', symbol: '7p', label: '🀟' },
  { value: '8', type: 'pin', symbol: '8p', label: '🀠' },
  { value: '9', type: 'pin', symbol: '9p', label: '🀡' },

  // Sou (Bamboo)
  { value: '1', type: 'sou', symbol: '1s', label: '🀐' },
  { value: '2', type: 'sou', symbol: '2s', label: '🀑' },
  { value: '3', type: 'sou', symbol: '3s', label: '🀒' },
  { value: '4', type: 'sou', symbol: '4s', label: '🀓' },
  { value: '5', type: 'sou', symbol: '5s', label: '🀔' },
  { value: '6', type: 'sou', symbol: '6s', label: '🀕' },
  { value: '7', type: 'sou', symbol: '7s', label: '🀖' },
  { value: '8', type: 'sou', symbol: '8s', label: '🀗' },
  { value: '9', type: 'sou', symbol: '9s', label: '🀘' },

  // Honors
  { value: '1', type: 'honors', symbol: '1z', label: '🀀' }, // East
  { value: '2', type: 'honors', symbol: '2z', label: '🀁' }, // South
  { value: '3', type: 'honors', symbol: '3z', label: '🀂' }, // West
  { value: '4', type: 'honors', symbol: '4z', label: '🀃' }, // North
  { value: '5', type: 'honors', symbol: '5z', label: '🀆' }, // White (Haku)
  { value: '6', type: 'honors', symbol: '6z', label: '🀅' }, // Green (Hatsu)
  { value: '7', type: 'honors', symbol: '7z', label: '🀄\uFE0E' }, // Red (Chun)
];

// Helper to convert hand to riichi string format
export function handToRiichiString(hand: Tile[]): string {
  // Riichi expects format like "112233m456p789s11z"
  // Actually standard format is: start with numbers, end with type suffix for each group?
  // Or just "1m2m3m..." which is also valid and simpler to generate.
  // Although "123m" is more standard.
  // Let's use the explicit "1m2m..." for simplicity unless riichi library complains.
  // Actually, usually it is sorted and grouped.
  // Let's sort the hand first.

  const sortedHand = [...hand].sort((a, b) => {
    const typeOrder = { 'man': 0, 'pin': 1, 'sou': 2, 'honors': 3 };
    if (typeOrder[a.type] !== typeOrder[b.type]) {
      return typeOrder[a.type] - typeOrder[b.type];
    }
    return parseInt(a.value) - parseInt(b.value);
  });

  // Group by type
  const groups: Record<string, string[]> = {
    man: [],
    pin: [],
    sou: [],
    honors: []
  };

  sortedHand.forEach(tile => {
    groups[tile.type].push(tile.value);
  });

  let result = '';
  if (groups.man.length > 0) result += groups.man.join('') + 'm';
  if (groups.pin.length > 0) result += groups.pin.join('') + 'p';
  if (groups.sou.length > 0) result += groups.sou.join('') + 's';
  if (groups.honors.length > 0) result += groups.honors.join('') + 'z';

  return result;
}
