
export type TileType = 'man' | 'pin' | 'sou' | 'honors';

export interface Tile {
  id: string; // unique id for React keys
  value: string; // 1-9 for suites, 1-7 for honors
  type: TileType;
  symbol: string; // standard notation e.g. 1m, 5p, 1z
  label: string; // Unicode character
  isOpen?: boolean; // True if part of an open set
}

export type FuroType = 'chi' | 'pon' | 'kan' | 'ankan';

export interface Furo {
  type: FuroType;
  tiles: Tile[];
}

export interface HandStatus {
  winType: 'tsumo' | 'ron';
  windField: 1 | 2; // 1: East, 2: South
  windPlayer: 1 | 2 | 3 | 4; // 1-4: East, South, West, North
  riichi: 0 | 1 | 2; // 0: None, 1: Riichi, 2: Double Riichi
  doraCount: number;
  honba: number;
  isIppatsu: boolean;
  isChankan: boolean;
  isRinshan: boolean;
  isHaiteiHoutei: boolean;
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
export function handToRiichiString(hand: Tile[], status?: HandStatus, furoSets?: Furo[]): string {
  // Riichi expects format like "112233m456p789s11z"
  // Furo are appended with '+' e.g. "+123m"
  // Dora, Riichi, Winds are also appended as options.

  // 1. Process closed hand tiles (tiles not in furoSets)
  const openTileIds = new Set<string>();
  if (furoSets) {
    furoSets.forEach(furo => {
      furo.tiles.forEach(t => openTileIds.add(t.id));
    });
  }

  const closedTiles = hand.filter(t => !openTileIds.has(t.id));

  const sortTiles = (tiles: Tile[]) => [...tiles].sort((a, b) => {
    const typeOrder = { 'man': 0, 'pin': 1, 'sou': 2, 'honors': 3 };
    if (typeOrder[a.type] !== typeOrder[b.type]) {
      return typeOrder[a.type] - typeOrder[b.type];
    }
    return parseInt(a.value) - parseInt(b.value);
  });

  const sortedClosed = sortTiles(closedTiles);

  // Group closed hand
  const groups: Record<string, string[]> = { man: [], pin: [], sou: [], honors: [] };
  sortedClosed.forEach(tile => groups[tile.type].push(tile.value));

  let result = '';
  if (groups.man.length > 0) result += groups.man.join('') + 'm';
  if (groups.pin.length > 0) result += groups.pin.join('') + 'p';
  if (groups.sou.length > 0) result += groups.sou.join('') + 's';
  if (groups.honors.length > 0) result += groups.honors.join('') + 'z';

  // For Ron/Tsumo, riichi library logic:
  // If Tsumo, the last tile drawn is normally just Part of the hand (if 14 tiles).
  // If Ron, the winning tile should be appended with '+'.
  // However, the user selects 14 tiles total. We will assume the last tile in `hand` is the winning tile.
  if (status && status.winType === 'ron' && closedTiles.length > 0) {
    // We need to extract the winning tile from the closed set, format the rest, and append the winning tile with '+'
    // To do this properly, let's treat the LAST tile added to `hand` (that is closed) as the winning tile.
    const lastTileInHand = hand[hand.length - 1];

    // Re-build closed string excluding the last tile
    const closedWithoutWin = sortedClosed.filter(t => t.id !== lastTileInHand.id);
    const groupsNoWin: Record<string, string[]> = { man: [], pin: [], sou: [], honors: [] };
    closedWithoutWin.forEach(t => groupsNoWin[t.type].push(t.value));

    let baseStr = '';
    if (groupsNoWin.man.length > 0) baseStr += groupsNoWin.man.join('') + 'm';
    if (groupsNoWin.pin.length > 0) baseStr += groupsNoWin.pin.join('') + 'p';
    if (groupsNoWin.sou.length > 0) baseStr += groupsNoWin.sou.join('') + 's';
    if (groupsNoWin.honors.length > 0) baseStr += groupsNoWin.honors.join('') + 'z';

    // Append the winning tile
    const suffixMap: Record<TileType, string> = { 'man': 'm', 'pin': 'p', 'sou': 's', 'honors': 'z' };
    result = baseStr + '+' + lastTileInHand.value + suffixMap[lastTileInHand.type];
  }

  // 2. Append Furo (Open Sets)
  if (furoSets && furoSets.length > 0) {
    furoSets.forEach(furo => {
      const sortedFuro = sortTiles(furo.tiles);
      const suffixMap: Record<TileType, string> = { 'man': 'm', 'pin': 'p', 'sou': 's', 'honors': 'z' };
      const typeStr = suffixMap[sortedFuro[0].type];
      const valuesStr = sortedFuro.map(t => t.value).join('');
      result += '+' + valuesStr + typeStr;
    });
  }

  // 3. Append Options (Winds, Riichi)
  if (status) {
    let options = '';

    // Winds: {field}{seat} -> e.g. '11' for East/East, '24' for South/North
    options += `${status.windField}${status.windPlayer}`;

    // Riichi
    if (status.riichi === 1) options += 'r';
    else if (status.riichi === 2) options += 'w'; // Double Riichi

    if (options) {
      result += '+' + options;
    }
  }

  return result;
}
