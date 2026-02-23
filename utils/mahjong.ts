import { Tile, TileType, Furo, FuroType, HandStatus } from '../types';

export const YakuNameMap: Record<string, string> = {
  // 1 Han
  'Riichi': '리치',
  'Tanyao': '탕야오',
  'Pinfu': '핑후',
  'Ippatsu': '일발',
  'Menzen Tsumo': '멘젠 쯔모',
  'Yakuhai': '역패',
  'Dora': '도라',
  'Ura Dora': '뒷도라',
  'Aka Dora': '아카도라',
  'Chanta': '찬타',
  'Junchan': '준찬타',
  'Honitsu': '혼일색',
  'Chinitsu': '청일색',
  'Iipeiko': '이페코',
  'Ryanpeiko': '량페코',
  'San Shoku': '삼색동순',
  'Ittsu': '일기통관',
  'Toitoi': '또이또이',
  'Chiitoitsu': '치또이',
  'Honroutou': '혼노두',
  'Shousangen': '소삼원',
  'Daisangen': '대삼원',
  'Tsuu Iisou': '자일색',
  'Ryuu Iisou': '녹일색',
  'Chinroutou': '청노두',
  'Kokushi Musou': '국사무쌍',
  'Suu Ankou': '사암각',
  'Suu Kantsu': '사깡즈',
  'Tenhou': '천화',
  'Chiihou': '지화',
  'Renhou': '인화',
  'Haitei': '해저로월',
  'Houtei': '하저로어',
  'Rinshan': '영상개화',
  'Chankan': '창깡',
  'Double Riichi': '더블 리치',

  // Yakuman
  'Nine Gates': '구련보등 (주련보등)',
  'Big Three Dragons': '대삼원',
  'Little Four Winds': '소사희',
  'Big Four Winds': '대사희',
  'All Green': '녹일색',
  'All Terminals': '청노두',
  'All Terminals and Honors': '혼노두',
  'All Honors': '자일색',
  'Thirteen Orphans': '국사무쌍',
  'Four Concealed Triplets': '사암각',
  'Four Kans': '사깡즈',

  // Common English aliases from libraries
  'Seven Pairs': '치또이',
  'Two Sets of Identical Sequences': '량페코', // Ryanpeiko
  'One Set of Identical Sequences': '이페코', // Iipeiko
  'All Simples': '탕야오',
  'Three Color Straight': '삼색동순',
  'Three Color Triplets': '삼색동각',
  'Straight': '일기통관',
  'Terminal in Each Set': '준찬타',
  'Terminal or Honor in Each Set': '찬타',
  'Half Flush': '혼일색',
  'Full Flush': '청일색',
  'Little Three Dragons': '소삼원',
  'Pure Double Chow': '이페코',
  'Twice Pure Double Chow': '량페코',
  'Honor Tiles': '역패',
  'Red Dragon': '역패 (중)',
  'Green Dragon': '역패 (발)',
  'White Dragon': '역패 (백)',
  'Round Wind': '역패 (장풍패)',
  'Seat Wind': '역패 (자풍패)',
  'Dragon': '역패 (삼원패)',

  // Score Limits
  'Mangan': '만관',
  'Haneman': '하네만',
  'Baiman': '배만',
  'Sanbaiman': '삼배만',
  'Yakuman': '역만',
  // Kanji Mappings (often appearing in Yaku list)
  '立直': '리치',
  '一発': '일발',
  '門前清自摸和': '멘젠 쯔모',
  '平和': '핑후',
  '断幺九': '탕야오',
  '一盃口': '이페코',
  '三色同順': '삼색동순',
  '一気通貫': '일기통관',
  '対々和': '또이또이',
  '七対子': '치또이쯔',
  '混全帯幺九': '찬타',
  '純全帯幺九': '준찬타',
  '混老頭': '혼노두',
  '三色同刻': '삼색동각',
  '三槓子': '산깡즈',
  '小三元': '소삼원',
  '混一色': '혼일색',
  '清一色': '청일색',
  '二盃口': '량페코',
  '嶺上開花': '영상개화',
  '海底摸月': '해저로월',
  '河底撈魚': '하저로어',
  '三暗刻': '산안커',
  'ドラ': '도라',
  '裏ドラ': '뒷도라',
  '赤ドラ': '아카도라',
  '天和': '천화',
  '地和': '지화',
  '人和': '인화',
  '小四喜': '소사희',
  '大四喜': '대사희',
  '大三元': '대삼원',
  '緑一色': '녹일색',
  '清老頭': '청노두',
  '字一色': '자일색',
  '四暗刻': '사암각',
  '国士無双': '국사무쌍',
  '九蓮宝燈': '구련보등',
  '四槓子': '사깡즈',

  // Yakuman Multipliers & Specials
  '役満': '역만',
  'ダブル役満': '더블 역만',
  '2倍役満': '2배 역만',
  '3倍役満': '3배 역만',
  '4倍役満': '4배 역만',
  '5倍役満': '5배 역만',
  '6倍役満': '6배 역만',
  '数え役満': '헤아림 역만',

  // Dragon/Wind Specifics
  '白': '역패 (백)',
  '發': '역패 (발)',
  '中': '역패 (중)',
  '場風': '역패 (장풍패)',
  '自風': '역패 (자풍패)',
};

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

    // 4. Append Dora specifically if doraCount > 0
    if (status.doraCount > 0 && hand.length > 0) {
      const doraTiles = hand.slice(0, Math.min(hand.length, status.doraCount));
      const dGroups: Record<string, string[]> = { man: [], pin: [], sou: [], honors: [] };
      doraTiles.forEach(t => dGroups[t.type].push(t.value));

      let doraStr = '';
      if (dGroups.man.length > 0) doraStr += dGroups.man.join('') + 'm';
      if (dGroups.pin.length > 0) doraStr += dGroups.pin.join('') + 'p';
      if (dGroups.sou.length > 0) doraStr += dGroups.sou.join('') + 's';
      if (dGroups.honors.length > 0) doraStr += dGroups.honors.join('') + 'z';

      if (doraStr) {
        result += '+d' + doraStr;
      }
    }
  }

  return result;
}
