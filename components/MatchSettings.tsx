import React from 'react';
import { HandStatus } from '../types';

interface MatchSettingsProps {
    handStatus: HandStatus;
    setHandStatus: (status: HandStatus) => void;
}

export function MatchSettings({ handStatus, setHandStatus }: MatchSettingsProps) {
    return (
        <section className="max-w-4xl mx-auto space-y-4 md:space-y-6">
            <h2 className="text-2xl font-black text-[#d4af37] pb-2 flex items-center gap-2 drop-shadow-md border-b border-[#ffffff]/10">
                <span>⚙️</span> 대국 설정
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {/* 대국 흐름 설정 (장풍, 자풍, 화료, 본장) */}
                <div className="bg-[#0f281e]/60 p-5 md:p-6 rounded-2xl border border-[#ffffff]/10 shadow-lg space-y-5 flex flex-col">
                    <h3 className="text-lg font-bold text-[#e8e8e3] border-b border-[#ffffff]/10 pb-2 flex items-center gap-2">
                        <span>🌬️</span> 기본 흐름
                    </h3>

                    <div className="space-y-4 flex-1">
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

                        <div className="flex items-center justify-between bg-[#1a2320] p-3 rounded-lg">
                            <label className="text-sm text-[#a3b8b0] font-semibold">화료 방법 (Win)</label>
                            <div className="flex gap-2">
                                <button onClick={() => setHandStatus({ ...handStatus, winType: 'tsumo' })} className={`px-4 py-2 md:py-1.5 rounded-md transition text-base md:text-sm ${handStatus.winType === 'tsumo' ? 'bg-[#2d3a35] text-[#d4af37] border border-[#d4af37]/50' : 'text-[#a3b8b0]'}`}>쯔모</button>
                                <button onClick={() => setHandStatus({ ...handStatus, winType: 'ron' })} className={`px-4 py-2 md:py-1.5 rounded-md transition text-base md:text-sm ${handStatus.winType === 'ron' ? 'bg-[#2d3a35] text-[#d4af37] border border-[#d4af37]/50' : 'text-[#a3b8b0]'}`}>론</button>
                            </div>
                        </div>
                    </div>

                    <div className="mt-auto pt-4 flex items-center justify-between border-t border-[#ffffff]/10">
                        <label className="text-sm text-[#a3b8b0] font-semibold flex items-center gap-2">본장 (Honba)</label>
                        <div className="flex items-center gap-3">
                            <button onClick={() => setHandStatus({ ...handStatus, honba: Math.max(0, handStatus.honba - 1) })} className="w-10 h-10 md:w-8 md:h-8 rounded-full bg-[#1a2320] text-white flex items-center justify-center hover:bg-[#3e524b] text-xl md:text-base border border-[#ffffff]/10">-</button>
                            <span className="text-2xl md:text-xl font-bold text-[#d4af37] w-5 text-center">{handStatus.honba}</span>
                            <button onClick={() => setHandStatus({ ...handStatus, honba: handStatus.honba + 1 })} className="w-10 h-10 md:w-8 md:h-8 rounded-full bg-[#1a2320] text-white flex items-center justify-center hover:bg-[#3e524b] text-xl md:text-base border border-[#ffffff]/10">+</button>
                        </div>
                    </div>
                </div>

                {/* 상황 점수 설정 (리치, 역 보너스 상황, 도라) */}
                <div className="bg-[#0f281e]/60 p-5 md:p-6 rounded-2xl border border-[#ffffff]/10 shadow-lg space-y-5 flex flex-col">
                    <h3 className="text-lg font-bold text-[#e8e8e3] border-b border-[#ffffff]/10 pb-2 flex items-center gap-2">
                        <span>✨</span> 역 보너스 & 도라
                    </h3>

                    <div className="space-y-4 flex-1">
                        <div className="flex flex-col gap-2">
                            <label className="text-sm text-[#a3b8b0] uppercase tracking-wider font-semibold">리치 (Riichi)</label>
                            <div className="flex bg-[#1a2320] rounded-lg p-1">
                                <button onClick={() => {
                                    let updated = { ...handStatus, riichi: 0 as 0 | 1 | 2 };
                                    if (handStatus.isIppatsu) updated.isIppatsu = false;
                                    setHandStatus(updated);
                                }} className={`flex-1 py-3 md:py-2 rounded-md transition text-base md:text-sm ${handStatus.riichi === 0 ? 'bg-[#2d3a35] text-white' : 'text-[#a3b8b0] hover:bg-[#2d3a35]'}`}>없음</button>
                                <button onClick={() => setHandStatus({ ...handStatus, riichi: 1 })} className={`flex-1 py-3 md:py-2 rounded-md transition text-base md:text-sm ${handStatus.riichi === 1 ? 'bg-[#8a1c1c] text-white font-bold border border-[#ff4444]/30' : 'text-[#a3b8b0] hover:bg-[#2d3a35]'}`}>리치 (+1)</button>
                                <button onClick={() => setHandStatus({ ...handStatus, riichi: 2 })} className={`flex-1 py-3 md:py-2 rounded-md transition text-base md:text-sm ${handStatus.riichi === 2 ? 'bg-[#8a1c1c] text-white font-bold border border-[#ff4444]/30' : 'text-[#a3b8b0] hover:bg-[#2d3a35]'}`}>더블 리치 (+2)</button>
                            </div>
                        </div>

                        <div className="flex flex-col gap-2 pt-2">
                            <label className="text-sm text-[#a3b8b0] uppercase tracking-wider font-semibold">추가 상황 (토글)</label>
                            <div className="flex flex-wrap gap-2">
                                <button
                                    disabled={handStatus.riichi === 0}
                                    onClick={() => setHandStatus({ ...handStatus, isIppatsu: !handStatus.isIppatsu })}
                                    className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all ${handStatus.riichi > 0
                                        ? (handStatus.isIppatsu ? 'bg-[#d4af37] text-black border-[#d4af37] shadow-[0_0_10px_rgba(212,175,55,0.3)]' : 'bg-[#1a2320] text-[#a3b8b0] border-[#ffffff]/10 hover:border-[#ffffff]/30 hover:bg-[#2d3a35]')
                                        : 'bg-[#1a2320] text-[#a3b8b0]/30 border-transparent cursor-not-allowed'}`}
                                >
                                    일발 (+1)
                                </button>

                                <button
                                    disabled={handStatus.winType !== 'ron'}
                                    onClick={() => setHandStatus({ ...handStatus, isChankan: !handStatus.isChankan })}
                                    className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all ${handStatus.winType === 'ron'
                                        ? (handStatus.isChankan ? 'bg-[#d4af37] text-black border-[#d4af37] shadow-[0_0_10px_rgba(212,175,55,0.3)]' : 'bg-[#1a2320] text-[#a3b8b0] border-[#ffffff]/10 hover:border-[#ffffff]/30 hover:bg-[#2d3a35]')
                                        : 'bg-[#1a2320] text-[#a3b8b0]/30 border-transparent cursor-not-allowed'}`}
                                >
                                    창깡 (+1)
                                </button>

                                <button
                                    onClick={() => setHandStatus({ ...handStatus, isRinshan: !handStatus.isRinshan })}
                                    className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all ${handStatus.isRinshan ? 'bg-[#d4af37] text-black border-[#d4af37] shadow-[0_0_10px_rgba(212,175,55,0.3)]' : 'bg-[#1a2320] text-[#a3b8b0] border-[#ffffff]/10 hover:border-[#ffffff]/30 hover:bg-[#2d3a35]'}`}
                                >
                                    영상개화 (+1)
                                </button>

                                <button
                                    onClick={() => setHandStatus({ ...handStatus, isHaiteiHoutei: !handStatus.isHaiteiHoutei })}
                                    className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all ${handStatus.isHaiteiHoutei ? 'bg-[#d4af37] text-black border-[#d4af37] shadow-[0_0_10px_rgba(212,175,55,0.3)]' : 'bg-[#1a2320] text-[#a3b8b0] border-[#ffffff]/10 hover:border-[#ffffff]/30 hover:bg-[#2d3a35]'}`}
                                >
                                    해저/하저 (+1)
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="mt-auto pt-4 flex items-center justify-between border-t border-[#ffffff]/10">
                        <label className="text-sm text-[#a3b8b0] font-semibold flex items-center gap-2">도라 (Dora)</label>
                        <div className="flex items-center gap-3">
                            <button onClick={() => setHandStatus({ ...handStatus, doraCount: Math.max(0, handStatus.doraCount - 1) })} className="w-10 h-10 md:w-8 md:h-8 rounded-full bg-[#1a2320] text-white flex items-center justify-center hover:bg-[#3e524b] text-xl md:text-base border border-[#ffffff]/10">-</button>
                            <span className="text-2xl md:text-xl font-bold text-[#d4af37] w-5 text-center">{handStatus.doraCount}</span>
                            <button onClick={() => setHandStatus({ ...handStatus, doraCount: handStatus.doraCount + 1 })} className="w-10 h-10 md:w-8 md:h-8 rounded-full bg-[#1a2320] text-white flex items-center justify-center hover:bg-[#3e524b] text-xl md:text-base border border-[#ffffff]/10">+</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
