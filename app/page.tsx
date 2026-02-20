
'use client';

import { useState } from 'react';
import { Tile as TileComponent } from '@/components/Tile';
import { TILES, Tile, handToRiichiString, HandStatus, Furo, FuroType } from '@/utils/mahjong';

import Riichi from 'riichi';

interface ScoreResult {
    ten: number;
    name: string;
    text: string;
    han: number;
    fu: number;
    yaku: Record<string, string>;
    error: boolean;
}

const YakuNameMap: Record<string, string> = {
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
    '七対子': '치또이',
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

    // Dragon/Wind Specifics
    '白': '역패 (백)',
    '發': '역패 (발)',
    '中': '역패 (중)',
    '場風': '역패 (장풍패)',
    '自風': '역패 (자풍패)',
};


export default function Home() {
    const [hand, setHand] = useState<Tile[]>([]);
    const [result, setResult] = useState<ScoreResult | null>(null); // To store scoring result
    const [error, setError] = useState<string | null>(null);

    const [handStatus, setHandStatus] = useState<HandStatus>({
        winType: 'tsumo',
        windField: 1, // East
        windPlayer: 1, // East
        riichi: 0,
        doraCount: 0,
        honba: 0,
        isIppatsu: false,
        isChankan: false,
        isRinshan: false,
        isHaiteiHoutei: false,
    });

    const [furoSets, setFuroSets] = useState<Furo[]>([]);
    const [selectedTiles, setSelectedTiles] = useState<string[]>([]); // To track tiles selected for making a set

    // Group tiles by type for display
    const tilesByType = {
        man: TILES.filter(t => t.type === 'man'),
        pin: TILES.filter(t => t.type === 'pin'),
        sou: TILES.filter(t => t.type === 'sou'),
        honors: TILES.filter(t => t.type === 'honors'),
    };

    const addToHand = (tileTemplate: Omit<Tile, 'id'>) => {
        if (hand.length >= 14) {
            setError('패는 최대 14개까지만 선택할 수 있습니다.');
            return;
        }
        const newTile: Tile = {
            ...tileTemplate,
            id: crypto.randomUUID(),
        };
        setHand([...hand, newTile]);
        setResult(null);
        setError(null);
    };

    const removeFromHand = (id: string) => {
        // If the tile is part of a furo set, do not allow removing individually, or remove the whole set.
        // For simplicity, we just remove it and clean up any furo set it belonged to.
        setHand(hand.filter(t => t.id !== id));
        setFuroSets(furoSets.map(set => ({
            ...set,
            tiles: set.tiles.filter(t => t.id !== id)
        })).filter(set => set.tiles.length >= 3)); // Keep set only if it still has at least 3 tiles (simplistic approach)

        setSelectedTiles(selectedTiles.filter(tId => tId !== id));
        setResult(null);
        setError(null);
    };

    const toggleTileSelection = (id: string) => {
        if (selectedTiles.includes(id)) {
            setSelectedTiles(selectedTiles.filter(tId => tId !== id));
        } else {
            setSelectedTiles([...selectedTiles, id]);
        }
    };

    const declareFuro = (type: FuroType) => {
        if (selectedTiles.length < 3) {
            setError('치, 퐁, 깡을 선언하려면 최소 3개의 패를 선택해야 합니다.');
            return;
        }

        const tilesToSet = hand.filter(t => selectedTiles.includes(t.id));

        // Mark tiles as open
        const updatedHand = hand.map(t => {
            if (selectedTiles.includes(t.id)) {
                return { ...t, isOpen: true };
            }
            return t;
        });

        setHand(updatedHand);
        setFuroSets([...furoSets, { type, tiles: tilesToSet }]);
        setSelectedTiles([]);
        setError(null);
    };

    const calculateScore = () => {
        if (hand.length !== 14) {
            setError('점수를 계산하려면 14개의 패가 필요합니다.');
            return;
        }


        try {
            const riichiString = handToRiichiString(hand, handStatus, furoSets);
            console.log('Riichi Input:', riichiString);

            // Generate base score from riichi
            const baseScore = new Riichi(riichiString).calc();

            if (baseScore.error) {
                setError('계산 실패. 패가 유효한 역이 없거나 구성이 잘못되었습니다.');
                return;
            }

            // Post-process Dora and Honba
            let finalTen = baseScore.ten;
            const finalYaku = { ...baseScore.yaku };
            let finalHan = baseScore.han;

            if (handStatus.doraCount > 0 && baseScore.isAgari && baseScore.han > 0) {
                finalYaku['Dora'] = `${handStatus.doraCount}飜`;
                finalHan += handStatus.doraCount;

                // Recalculate Ten based on new Han (Simplified approximation for now: 
                // Normally riichi package limits mangan/haneman based on han+dora. 
                // We'd ideally need a full scoring table or rely on the riichi package's internal dora parser.
                // Since the riichi package uses +d1s format, it might be better to just let the lib do it, 
                // but we only know "count" not specific tiles.
                // We will add the dora text and just adjust if needed, but for perfect accuracy 
                // we should ideally pass specific tiles to the riichi lib options.)
                // For this MVP, we just display the Dora in the Yaku list. Note that points might not scale to Mangan automatically 
                // if we don't implement the full table here.
            }

            // Special Yaku Bonuses
            if (baseScore.isAgari && baseScore.han > 0) {
                // Ippatsu (only if Riichi is declared)
                if (handStatus.isIppatsu && handStatus.riichi > 0) {
                    finalYaku['Ippatsu'] = '1飜';
                    finalHan += 1;
                }

                // Chankan (only if Ron)
                if (handStatus.isChankan && handStatus.winType === 'ron') {
                    finalYaku['Chankan'] = '1飜';
                    finalHan += 1;
                }

                // Rinshan (typically after Kan, so realistically Tsumo, but we'll apply +1 if checked)
                if (handStatus.isRinshan) {
                    finalYaku['Rinshan'] = '1飜';
                    finalHan += 1;
                }

                // Haitei / Houtei
                if (handStatus.isHaiteiHoutei) {
                    if (handStatus.winType === 'tsumo') {
                        finalYaku['Haitei'] = '1飜';
                    } else {
                        finalYaku['Houtei'] = '1飜';
                    }
                    finalHan += 1;
                }
            }

            // Honba Adjustment
            // Tsumo: +100 per honba per player (Total +300 for Tsumo, or +300 for Ron)
            if (handStatus.honba > 0 && finalTen > 0) {
                finalTen += (handStatus.honba * 300);
            }

            setResult({
                ...baseScore,
                yaku: finalYaku,
                han: finalHan,
                ten: finalTen
            });
            setError(null);

        } catch (e: unknown) { // Use unknown for safety

            console.error(e);
            setError('계산 중 오류가 발생했습니다.');
        }
    };

    const clearHand = () => {
        setHand([]);
        setResult(null);
        setError(null);
    };

    const getTypeLabel = (type: string) => {
        switch (type) {
            case 'man': return '만수패 (萬)';
            case 'pin': return '통수패 (筒)';
            case 'sou': return '삭수패 (索)';
            case 'honors': return '자패 (바람/삼원패)';
            default: return type;
        }
    };

    const translateYaku = (name: string) => {
        return YakuNameMap[name] || name;
    };


    return (
        <main className="min-h-screen p-4 md:p-8 bg-transparent text-[#e8e8e3] selection:bg-[#d4af37]/30">
            <div className="max-w-7xl mx-auto space-y-12 pb-20">
                {/* Header */}
                <header className="text-center pt-8 pb-4 border-b border-[#d4af37]/20">
                    <h1 className="text-5xl md:text-7xl font-black mb-4 text-[#d4af37] drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] tracking-tight">
                        <span className="inline-block hover:scale-110 transition-transform cursor-default">🀄</span> 마작 점수 계산기
                    </h1>
                    <p className="text-[#a3b8b0] text-xl font-light tracking-wide">
                        점수 계산하다가 싸우지 마세요
                    </p>
                </header>

                {/* Match Settings Panel */}
                <section className="bg-[#0f281e]/40 p-4 md:p-6 rounded-2xl border border-[#ffffff]/5 shadow-lg max-w-4xl mx-auto space-y-6">
                    <h2 className="text-xl font-bold text-[#d4af37] border-b border-[#ffffff]/10 pb-2 flex items-center gap-2">
                        <span>⚙️</span> 대국 설정
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Winds & Win Type */}
                        <div className="space-y-4">
                            <div className="flex flex-col gap-2">
                                <label className="text-sm text-[#a3b8b0] uppercase tracking-wider font-semibold">장풍 (Field Wind)</label>
                                <div className="flex bg-[#1a2320] rounded-lg p-1">
                                    <button onClick={() => setHandStatus({ ...handStatus, windField: 1 })} className={`flex-1 py-3 md:py-2 rounded-md transition text-base md:text-sm ${handStatus.windField === 1 ? 'bg-[#d4af37] text-black font-bold' : 'text-[#a3b8b0] hover:bg-[#2d3a35]'}`}>동 (East)</button>
                                    <button onClick={() => setHandStatus({ ...handStatus, windField: 2 })} className={`flex-1 py-3 md:py-2 rounded-md transition text-base md:text-sm ${handStatus.windField === 2 ? 'bg-[#d4af37] text-black font-bold' : 'text-[#a3b8b0] hover:bg-[#2d3a35]'}`}>남 (South)</button>
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-sm text-[#a3b8b0] uppercase tracking-wider font-semibold">자풍 (Seat Wind)</label>
                                <div className="flex bg-[#1a2320] rounded-lg p-1">
                                    <button onClick={() => setHandStatus({ ...handStatus, windPlayer: 1 })} className={`flex-1 py-3 md:py-2 rounded-md transition text-base md:text-sm ${handStatus.windPlayer === 1 ? 'bg-[#d4af37] text-black font-bold' : 'text-[#a3b8b0] hover:bg-[#2d3a35]'}`}>동 (친)</button>
                                    <button onClick={() => setHandStatus({ ...handStatus, windPlayer: 2 })} className={`flex-1 py-3 md:py-2 rounded-md transition text-base md:text-sm ${handStatus.windPlayer === 2 ? 'bg-[#d4af37] text-black font-bold' : 'text-[#a3b8b0] hover:bg-[#2d3a35]'}`}>남 (자)</button>
                                    <button onClick={() => setHandStatus({ ...handStatus, windPlayer: 3 })} className={`flex-1 py-3 md:py-2 rounded-md transition text-base md:text-sm ${handStatus.windPlayer === 3 ? 'bg-[#d4af37] text-black font-bold' : 'text-[#a3b8b0] hover:bg-[#2d3a35]'}`}>서 (자)</button>
                                    <button onClick={() => setHandStatus({ ...handStatus, windPlayer: 4 })} className={`flex-1 py-3 md:py-2 rounded-md transition text-base md:text-sm ${handStatus.windPlayer === 4 ? 'bg-[#d4af37] text-black font-bold' : 'text-[#a3b8b0] hover:bg-[#2d3a35]'}`}>북 (자)</button>
                                </div>
                            </div>
                        </div>

                        {/* Modifiers & Counters */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between bg-[#1a2320] p-3 rounded-lg">
                                <label className="text-sm text-[#a3b8b0] font-semibold">화료 방법 (Win Type)</label>
                                <div className="flex gap-2">
                                    <button onClick={() => setHandStatus({ ...handStatus, winType: 'tsumo' })} className={`px-4 py-2 md:py-1.5 rounded-md transition text-base md:text-sm ${handStatus.winType === 'tsumo' ? 'bg-[#2d3a35] text-[#d4af37] border border-[#d4af37]/50' : 'text-[#a3b8b0]'}`}>쯔모 (Tsumo)</button>
                                    <button onClick={() => setHandStatus({ ...handStatus, winType: 'ron' })} className={`px-4 py-2 md:py-1.5 rounded-md transition text-base md:text-sm ${handStatus.winType === 'ron' ? 'bg-[#2d3a35] text-[#d4af37] border border-[#d4af37]/50' : 'text-[#a3b8b0]'}`}>론 (Ron)</button>
                                </div>
                            </div>

                            <div className="flex items-center justify-between bg-[#1a2320] p-3 rounded-lg">
                                <label className="text-sm text-[#a3b8b0] font-semibold">리치 (Riichi)</label>
                                <div className="flex gap-2">
                                    <button onClick={() => {
                                        let updated = { ...handStatus, riichi: 0 as 0 | 1 | 2 };
                                        if (handStatus.isIppatsu) updated.isIppatsu = false; // Disable Ippatsu if Riichi is turned off
                                        setHandStatus(updated);
                                    }} className={`px-3 py-2 md:py-1.5 rounded-md transition text-base md:text-sm ${handStatus.riichi === 0 ? 'bg-[#2d3a35] text-white' : 'text-[#a3b8b0]'}`}>없음</button>
                                    <button onClick={() => setHandStatus({ ...handStatus, riichi: 1 })} className={`px-3 py-2 md:py-1.5 rounded-md transition text-base md:text-sm ${handStatus.riichi === 1 ? 'bg-[#8a1c1c] text-white font-bold' : 'text-[#a3b8b0]'}`}>리치</button>
                                    <button onClick={() => setHandStatus({ ...handStatus, riichi: 2 })} className={`px-3 py-2 md:py-1.5 rounded-md transition text-base md:text-sm ${handStatus.riichi === 2 ? 'bg-[#8a1c1c] text-white font-bold' : 'text-[#a3b8b0]'}`}>더블 리치</button>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="flex-1 flex items-center justify-between bg-[#1a2320] p-3 rounded-lg">
                                    <label className="text-sm text-[#a3b8b0] font-semibold">도라 (Dora)</label>
                                    <div className="flex items-center gap-3">
                                        <button onClick={() => setHandStatus({ ...handStatus, doraCount: Math.max(0, handStatus.doraCount - 1) })} className="w-10 h-10 md:w-8 md:h-8 rounded-full bg-[#2d3a35] text-white flex items-center justify-center hover:bg-[#3e524b] text-xl md:text-base">-</button>
                                        <span className="text-2xl md:text-xl font-bold text-[#d4af37] w-5 text-center">{handStatus.doraCount}</span>
                                        <button onClick={() => setHandStatus({ ...handStatus, doraCount: handStatus.doraCount + 1 })} className="w-10 h-10 md:w-8 md:h-8 rounded-full bg-[#2d3a35] text-white flex items-center justify-center hover:bg-[#3e524b] text-xl md:text-base">+</button>
                                    </div>
                                </div>
                                <div className="flex-1 flex items-center justify-between bg-[#1a2320] p-3 rounded-lg">
                                    <label className="text-sm text-[#a3b8b0] font-semibold">본장 (Honba)</label>
                                    <div className="flex items-center gap-3">
                                        <button onClick={() => setHandStatus({ ...handStatus, honba: Math.max(0, handStatus.honba - 1) })} className="w-10 h-10 md:w-8 md:h-8 rounded-full bg-[#2d3a35] text-white flex items-center justify-center hover:bg-[#3e524b] text-xl md:text-base">-</button>
                                        <span className="text-2xl md:text-xl font-bold text-[#d4af37] w-5 text-center">{handStatus.honba}</span>
                                        <button onClick={() => setHandStatus({ ...handStatus, honba: handStatus.honba + 1 })} className="w-10 h-10 md:w-8 md:h-8 rounded-full bg-[#2d3a35] text-white flex items-center justify-center hover:bg-[#3e524b] text-xl md:text-base">+</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Additional Yaku Options */}
                    <div className="mt-6 pt-6 border-t border-[#ffffff]/10">
                        <h3 className="text-sm text-[#a3b8b0] uppercase tracking-wider font-semibold mb-4">판수 보너스 옵션</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            <label className={`flex items-center gap-2 p-3 rounded-lg border transition cursor-pointer ${handStatus.riichi > 0 ? (handStatus.isIppatsu ? 'bg-[#2d3a35] border-[#d4af37]/50' : 'bg-[#1a2320] border-transparent hover:border-[#ffffff]/20') : 'opacity-50 cursor-not-allowed bg-[#1a2320] border-transparent'}`}>
                                <input
                                    type="checkbox"
                                    disabled={handStatus.riichi === 0}
                                    checked={handStatus.isIppatsu}
                                    onChange={(e) => setHandStatus({ ...handStatus, isIppatsu: e.target.checked })}
                                    className="w-5 h-5 accent-[#d4af37]"
                                />
                                <div className="flex flex-col">
                                    <span className="font-semibold text-[#e8e8e3]">일발</span>
                                    <span className="text-xs text-[#d4af37]">+1판</span>
                                </div>
                            </label>

                            <label className={`flex items-center gap-2 p-3 rounded-lg border transition cursor-pointer ${handStatus.winType === 'ron' ? (handStatus.isChankan ? 'bg-[#2d3a35] border-[#d4af37]/50' : 'bg-[#1a2320] border-transparent hover:border-[#ffffff]/20') : 'opacity-50 cursor-not-allowed bg-[#1a2320] border-transparent'}`}>
                                <input
                                    type="checkbox"
                                    disabled={handStatus.winType !== 'ron'}
                                    checked={handStatus.isChankan}
                                    onChange={(e) => setHandStatus({ ...handStatus, isChankan: e.target.checked })}
                                    className="w-5 h-5 accent-[#d4af37]"
                                />
                                <div className="flex flex-col">
                                    <span className="font-semibold text-[#e8e8e3]">창깡</span>
                                    <span className="text-xs text-[#d4af37]">+1판</span>
                                </div>
                            </label>

                            <label className={`flex items-center gap-2 p-3 rounded-lg border transition cursor-pointer ${handStatus.isRinshan ? 'bg-[#2d3a35] border-[#d4af37]/50' : 'bg-[#1a2320] border-transparent hover:border-[#ffffff]/20'}`}>
                                <input
                                    type="checkbox"
                                    checked={handStatus.isRinshan}
                                    onChange={(e) => setHandStatus({ ...handStatus, isRinshan: e.target.checked })}
                                    className="w-5 h-5 accent-[#d4af37]"
                                />
                                <div className="flex flex-col">
                                    <span className="font-semibold text-[#e8e8e3]">영상개화</span>
                                    <span className="text-xs text-[#d4af37]">+1판</span>
                                </div>
                            </label>

                            <label className={`flex items-center gap-2 p-3 rounded-lg border transition cursor-pointer ${handStatus.isHaiteiHoutei ? 'bg-[#2d3a35] border-[#d4af37]/50' : 'bg-[#1a2320] border-transparent hover:border-[#ffffff]/20'}`}>
                                <input
                                    type="checkbox"
                                    checked={handStatus.isHaiteiHoutei}
                                    onChange={(e) => setHandStatus({ ...handStatus, isHaiteiHoutei: e.target.checked })}
                                    className="w-5 h-5 accent-[#d4af37]"
                                />
                                <div className="flex flex-col">
                                    <span className="font-semibold text-[#e8e8e3]">해저/하저</span>
                                    <span className="text-xs text-[#d4af37]">+1판</span>
                                </div>
                            </label>
                        </div>
                    </div>
                </section>

                {/* Hand Area (The Rack) */}

                <section className="relative">

                    {/* Wood Rail Container */}
                    <div className="bg-[#3e2723] p-4 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.5),inset_0_2px_5px_rgba(255,255,255,0.1)] border-b-8 border-[#2d1b18]">
                        <div className="bg-[#0f281e] rounded-lg p-6 min-h-[140px] md:min-h-[180px] flex flex-wrap gap-2 md:gap-4 justify-center items-center shadow-inner relative overflow-hidden">

                            {/* Felt Texture Overlay for Rack */}
                            <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'var(--felt-texture)' }}></div>

                            {hand.length === 0 && (
                                <div className="text-center space-y-3 z-10 opacity-60">
                                    <div className="text-5xl animate-bounce">👇</div>
                                    <div className="text-[#a3b8b0] text-lg font-light">패를 선택하여 이곳에 올려주세요</div>
                                </div>
                            )}

                            {hand.map((tile) => (
                                <TileComponent
                                    key={tile.id}
                                    tile={tile}
                                    onClick={() => toggleTileSelection(tile.id)}
                                    selected={selectedTiles.includes(tile.id)}
                                    className={`
                                        transition-all duration-300 shadow-2xl z-10
                                        ${tile.isOpen ? 'opacity-80 scale-95 -rotate-2 mix-blend-luminosity' : 'hover:-translate-y-4 hover:rotate-1'}
                                    `}
                                />
                            ))}

                            {/* Ghost Tile Placeholder if hand not full */}
                            {hand.length < 14 && hand.length > 0 && (
                                <div className="w-14 h-20 md:w-20 md:h-28 border-2 border-dashed border-[#ffffff]/20 rounded-lg flex items-center justify-center">
                                    <span className="text-[#ffffff]/20 text-2xl font-bold">+</span>
                                </div>
                            )}
                        </div>
                    </div >

                    {/* Furo Action Menu (Shows when tiles are selected) */}
                    {
                        selectedTiles.length >= 3 && (
                            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 z-20 flex gap-2 p-2 bg-[#1a1a1a] rounded-lg border border-[#d4af37]/30 shadow-2xl animate-in slide-in-from-top-4">
                                <button onClick={() => declareFuro('chi')} className="px-4 py-2 bg-[#2d3a35] hover:bg-[#3e524b] text-[#a3b8b0] hover:text-white rounded transition">치 (Chi)</button>
                                <button onClick={() => declareFuro('pon')} className="px-4 py-2 bg-[#2d3a35] hover:bg-[#3e524b] text-[#a3b8b0] hover:text-white rounded transition">퐁 (Pon)</button>
                                <button onClick={() => declareFuro('kan')} className="px-4 py-2 bg-[#2d3a35] hover:bg-[#3e524b] text-[#a3b8b0] hover:text-white rounded transition">명깡 (Kan)</button>
                                <button onClick={() => declareFuro('ankan')} className="px-4 py-2 bg-[#2d3a35] hover:bg-[#3e524b] text-[#a3b8b0] hover:text-white rounded transition">안깡 (Ankan)</button>
                                <button onClick={() => setSelectedTiles([])} className="px-4 py-2 bg-[#4a0e0e] hover:bg-[#6b1616] text-[#e8e8e3] rounded transition ml-2">취소</button>
                            </div>
                        )
                    }

                    {/* Controls */}
                    <div className="mt-6 flex justify-center gap-4">
                        <button
                            onClick={clearHand}
                            className="px-6 py-4 md:py-3 text-lg md:text-base bg-[#4a0e0e] hover:bg-[#6b1616] text-[#e8e8e3] rounded-lg font-medium transition-all shadow-lg hover:shadow-red-900/40 active:translate-y-1 border-b-4 border-[#2d0808] active:border-b-0"
                        >
                            초기화
                        </button>
                        <button
                            onClick={calculateScore}
                            disabled={hand.length !== 14}
                            className={`px-8 py-4 md:px-10 md:py-3 rounded-lg font-bold text-2xl md:text-xl transition-all flex items-center gap-3 shadow-lg active:translate-y-1 border-b-4 ${hand.length === 14
                                ? 'bg-[#d4af37] hover:bg-[#f3c846] text-[#0f281e] border-[#8a7224] active:border-b-0 hover:shadow-[#d4af37]/30'
                                : 'bg-[#2d3a35] text-[#4a5f58] border-[#1a2320] cursor-not-allowed'
                                }`}
                        >
                            <span>🧮</span> 점수 계산
                        </button>
                    </div>

                    {
                        error && (
                            <div className="mt-6 mx-auto max-w-md p-4 bg-red-900/80 backdrop-blur-sm border border-red-500/30 rounded-lg text-red-100 flex items-center justify-center gap-3 animate-pulse shadow-lg">
                                <span>⚠️</span> {error}
                            </div>
                        )
                    }
                </section >

                {/* Result Modal - Overlay Style */}
                {
                    result && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-300" onClick={() => setResult(null)}>
                            <div className="bg-[#1a1a1a] max-w-4xl w-full rounded-2xl border border-[#d4af37]/50 shadow-[0_0_50px_rgba(212,175,55,0.2)] overflow-hidden relative" onClick={e => e.stopPropagation()}>

                                {/* Close Button */}
                                <button onClick={() => setResult(null)} className="absolute top-4 right-4 text-[#a3b8b0] hover:text-white transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>

                                <div className="bg-gradient-to-r from-[#2d1b18] to-[#3e2723] p-8 border-b border-[#d4af37]/30">
                                    <h3 className="text-3xl font-bold bg-gradient-to-r from-[#d4af37] to-[#f7e7ce] bg-clip-text text-transparent drop-shadow-sm text-center mb-4">
                                        {result.name ? (YakuNameMap[result.name] || result.name) : '점수 없음'}
                                    </h3>
                                </div>

                                <div className="p-8 grid md:grid-cols-5 gap-8 bg-[#0f281e] relative">
                                    <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'var(--felt-texture)' }}></div>

                                    <div className="md:col-span-3 space-y-6 relative z-10">
                                        <div className="bg-black/30 p-8 rounded-xl border border-[#d4af37]/20 text-center backdrop-blur-sm">
                                            <p className="text-[#d4af37]/80 uppercase tracking-widest text-sm font-semibold mb-2">총 점수</p>
                                            <div className="text-7xl md:text-8xl font-black text-[#d4af37] drop-shadow-[0_0_15px_rgba(212,175,55,0.4)]">
                                                {result.ten > 0 ? result.ten.toLocaleString() : 0}
                                                <span className="text-3xl text-[#a3b8b0] ml-2 font-light">점</span>
                                            </div>
                                        </div>

                                        <div className="bg-black/30 rounded-xl border border-[#ffffff]/10 overflow-hidden backdrop-blur-sm">
                                            <div className="bg-[#ffffff]/5 px-6 py-3 text-lg font-semibold text-[#a3b8b0] flex items-center gap-2">
                                                <span>📜</span> 적용된 역 (Yaku)
                                            </div>
                                            {result.yaku && Object.keys(result.yaku).length > 0 ? (
                                                <ul className="divide-y divide-[#ffffff]/10">
                                                    {Object.entries(result.yaku).map(([name, han]) => (
                                                        <li key={name} className="flex justify-between items-center px-6 py-4 hover:bg-[#ffffff]/5 transition-colors">
                                                            <span className="font-bold text-xl text-[#e8e8e3]">{translateYaku(name)}</span>
                                                            <span className="font-mono text-[#d4af37] bg-[#d4af37]/10 px-3 py-1 rounded border border-[#d4af37]/20">{String(han)} 판</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            ) : (
                                                <div className="p-8 text-center text-[#a3b8b0] italic">적용된 역이 없습니다.</div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="md:col-span-2 flex flex-col gap-6 relative z-10">
                                        <div className="bg-gradient-to-br from-[#2d3a35] to-[#1a2320] p-8 rounded-xl border border-[#ffffff]/10 shadow-lg flex-1 flex flex-col justify-center space-y-8">
                                            <div className="flex justify-center gap-12 mt-8 text-[#d4af37]/90 text-xl font-light border-t border-[#d4af37]/20 pt-6 w-full max-w-md mx-auto">
                                                <div className="flex flex-col items-center">
                                                    <span className="text-5xl font-serif font-bold text-[#f7e7ce] mb-1 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                                                        {/* Mangan/Yakuman usually doesn't show han/fu in same way, but user wants it displayed. 
                                        If 'han' is undefined (e.g. limit hand), fall back to logic or standard 13/etc if possible, or just hide if truly N/A?
                                        User said "make it displayed even if not displayed". 
                                        Often limit hands imply Han, but riichi lib output structure varies.
                                        Let's just show whatever result has, or '-' if absolutely missing, but usually result.han is there.
                                    */}
                                                        {result.han !== undefined ? result.han : (result.name === 'Yakuman' ? '13' : '-')}
                                                    </span>
                                                    <span className="text-sm uppercase tracking-widest opacity-70">판 (Han)</span>
                                                </div>
                                                <div className="w-px bg-[#d4af37]/30 h-16 self-center"></div>
                                                <div className="flex flex-col items-center">
                                                    <span className="text-5xl font-serif font-bold text-[#f7e7ce] mb-1 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                                                        {result.fu !== undefined ? result.fu : '-'}
                                                    </span>
                                                    <span className="text-sm uppercase tracking-widest opacity-70">부 (Fu)</span>
                                                </div>
                                            </div>
                                            {result.text && (
                                                <div className="text-sm text-[#a3b8b0] font-mono mt-4 pt-4 border-t border-[#ffffff]/10 leading-relaxed break-all bg-black/20 p-4 rounded-lg">
                                                    {result.text}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }

                {/* Tile Selection Palette */}
                <section className="grid grid-cols-1 gap-8">
                    {Object.entries(tilesByType).map(([type, tiles]) => (
                        <div key={type} className="bg-[#0f281e]/40 p-6 md:p-8 rounded-2xl border border-[#ffffff]/5 relative overflow-hidden group hover:bg-[#0f281e]/60 transition-colors duration-300">
                            <h3 className="text-2xl font-bold mb-6 text-[#d4af37] flex items-center justify-center gap-4 border-b border-[#ffffff]/10 pb-4">
                                <span className={`w-2 h-8 rounded-full ${type === 'man' ? 'bg-[#8a1c1c]' : type === 'pin' ? 'bg-[#1c3d5c]' : type === 'sou' ? 'bg-[#1c5c2e]' : 'bg-[#d4af37]'}`}></span>
                                {getTypeLabel(type)}
                            </h3>
                            <div className="flex flex-wrap gap-3 md:gap-5 justify-center">
                                {tiles.map((tile) => (
                                    <TileComponent
                                        key={tile.symbol}
                                        tile={tile}
                                        onClick={() => addToHand(tile)}
                                        className="hover:shadow-xl hover:scale-110 active:scale-95 transition-all duration-200"
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
                </section>
            </div >

            <footer className="text-center text-[#a3b8b0]/40 text-sm pb-8 font-light tracking-widest uppercase">
                Mahjong Scorer &copy; {new Date().getFullYear()}
            </footer>
        </main >
    );
}
