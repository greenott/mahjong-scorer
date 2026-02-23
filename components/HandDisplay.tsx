import React from 'react';
import { Tile as TileType } from '../types';
import { Tile } from './Tile';

interface HandDisplayProps {
    hand: TileType[];
    selectedTiles: string[];
    toggleTileSelection: (id: string) => void;
}

export function HandDisplay({ hand, selectedTiles, toggleTileSelection }: HandDisplayProps) {
    return (
        <div className="sticky top-0 z-40 -mx-4 px-4 md:-mx-8 md:px-8 pt-4 pb-6 md:pb-8 bg-[#0f281e]/95 backdrop-blur-md shadow-[0_15px_30px_rgba(0,0,0,0.6)] border-b border-[#000000]/50 transition-all duration-300">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-end mb-3">
                    <h2 className="text-lg md:text-xl font-bold text-[#d4af37] flex items-center gap-2 drop-shadow-md">
                        <span>🖐</span> 내가 선택한 패
                    </h2>
                    <span className="text-xs md:text-sm font-bold text-[#a3b8b0] bg-[#1a2320] px-3 py-1 rounded-full border border-[#ffffff]/10 shadow-inner tracking-wider">
                        {hand.length} <span className="opacity-40">/ 14</span>
                    </span>
                </div>

                {/* 나무 거치대 디자인 */}
                <div className="bg-[#3e2723] p-2 md:p-3 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.5),inset_0_2px_5px_rgba(255,255,255,0.1)] border-b-4 md:border-b-8 border-[#2d1b18]">
                    <div className="bg-[#0f281e] rounded-lg p-2 md:p-5 min-h-[90px] md:min-h-[140px] flex flex-wrap gap-1.5 md:gap-3 justify-center items-center shadow-inner relative overflow-hidden transition-all duration-300">

                        {/* 펠트 텍스처 오버레이 */}
                        <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'var(--felt-texture)' }}></div>

                        {/* 패가 없을 때 표시되는 안내문 */}
                        {hand.length === 0 && (
                            <div className="text-center space-y-1 md:space-y-2 z-10 opacity-60 py-4">
                                <div className="text-3xl md:text-5xl animate-bounce">👇</div>
                                <div className="text-[#a3b8b0] text-xs md:text-lg font-light">패를 선택하여 이곳에 올려주세요</div>
                            </div>
                        )}

                        {/* 선택된 패 목록 렌더링 */}
                        {hand.map((tile) => (
                            <div key={tile.id} className="transform scale-[0.7] sm:scale-[0.85] md:scale-100 origin-center transition-transform duration-300">
                                <Tile
                                    tile={tile}
                                    onClick={() => toggleTileSelection(tile.id)}
                                    selected={selectedTiles.includes(tile.id)}
                                    className={`
                                        transition-all duration-300 shadow-xl z-20 hover:z-30
                                        ${tile.isOpen ? 'opacity-80 scale-95 -rotate-2 mix-blend-luminosity' : 'hover:-translate-y-2 md:hover:-translate-y-4 hover:rotate-1'}
                                    `}
                                />
                            </div>
                        ))}

                        {/* 패가 다 차지 않았을 때 빈 칸 표시 (유령 패) */}
                        {hand.length < 14 && hand.length > 0 && (
                            <div className="w-10 h-14 sm:w-12 sm:h-16 md:w-20 md:h-28 border-2 border-dashed border-[#ffffff]/20 rounded-lg flex items-center justify-center transition-all duration-300 m-1">
                                <span className="text-[#ffffff]/20 text-xl md:text-2xl font-bold">+</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
