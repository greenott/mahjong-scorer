import React from 'react';
import { FuroType } from '../types';

interface ActionControlsProps {
    selectedTilesLength: number;
    handLength: number;
    declareFuro: (type: FuroType) => void;
    setSelectedTiles: (tiles: string[]) => void;
    clearHand: () => void;
    calculateScore: () => void;
}

export function ActionControls({
    selectedTilesLength,
    handLength,
    declareFuro,
    setSelectedTiles,
    clearHand,
    calculateScore,
}: ActionControlsProps) {
    return (
        <section className="relative max-w-7xl mx-auto">
            {/* 후로(치, 퐁, 깡) 액션 메뉴 (패가 3개 이상 선택되었을 때 표시) */}
            {selectedTilesLength >= 3 && (
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-20 flex gap-2 p-2 bg-[#1a1a1a] rounded-lg border border-[#d4af37]/30 shadow-2xl animate-in slide-in-from-top-4">
                    <button onClick={() => declareFuro('chi')} className="px-4 py-2 bg-[#2d3a35] hover:bg-[#3e524b] text-[#a3b8b0] hover:text-white rounded transition">치 (Chi)</button>
                    <button onClick={() => declareFuro('pon')} className="px-4 py-2 bg-[#2d3a35] hover:bg-[#3e524b] text-[#a3b8b0] hover:text-white rounded transition">퐁 (Pon)</button>
                    <button onClick={() => declareFuro('kan')} className="px-4 py-2 bg-[#2d3a35] hover:bg-[#3e524b] text-[#a3b8b0] hover:text-white rounded transition">명깡 (Kan)</button>
                    <button onClick={() => declareFuro('ankan')} className="px-4 py-2 bg-[#2d3a35] hover:bg-[#3e524b] text-[#a3b8b0] hover:text-white rounded transition">안깡 (Ankan)</button>
                    <button onClick={() => setSelectedTiles([])} className="px-4 py-2 bg-[#4a0e0e] hover:bg-[#6b1616] text-[#e8e8e3] rounded transition ml-2">취소</button>
                </div>
            )}

            {/* 기본 컨트롤 버튼 (초기화, 점수 계산) */}
            <div className="flex justify-center items-stretch gap-4 mt-8 md:mt-10">
                <button
                    onClick={clearHand}
                    className="px-6 py-4 md:px-8 md:py-5 text-xl md:text-2xl bg-[#4a0e0e] hover:bg-[#6b1616] text-[#e8e8e3] rounded-xl font-bold transition-all shadow-lg hover:shadow-red-900/40 active:translate-y-1 border-b-6 border-[#2d0808] active:border-b-0"
                >
                    초기화
                </button>
                <button
                    onClick={calculateScore}
                    disabled={handLength !== 14}
                    className={`px-8 py-4 md:px-12 md:py-5 rounded-xl font-black text-2xl md:text-3xl transition-all flex items-center justify-center gap-3 shadow-lg active:translate-y-1 border-b-6 ${handLength === 14
                        ? 'bg-[#d4af37] hover:bg-[#f3c846] text-[#0f281e] border-[#8a7224] active:border-b-0 hover:shadow-[#d4af37]/30'
                        : 'bg-[#2d3a35] text-[#4a5f58] border-[#1a2320] cursor-not-allowed'
                        }`}
                >
                    <span className="text-3xl md:text-4xl">🧮</span> 점수 계산
                </button>
            </div>
        </section>
    );
}
