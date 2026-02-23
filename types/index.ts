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

export interface ScoreResult {
    ten: number;
    name: string;
    isAgari: boolean;
    text: string;
    han: number;
    fu: number;
    yaku: Record<string, string>;
    error: boolean;
}
