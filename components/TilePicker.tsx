import React from 'react';
import { TILES } from '../utils/mahjong';
import { Tile as TileType } from '../types';
import { Tile } from './Tile';

interface TilePickerProps {
    addToHand: (tileTemplate: Omit<TileType, 'id'>) => void;
}

export function TilePicker({ addToHand }: TilePickerProps) {
    // 패들을 타입별로 미리 그룹화
    const tilesByType = {
        man: TILES.filter(t => t.type === 'man'),
        pin: TILES.filter(t => t.type === 'pin'),
        sou: TILES.filter(t => t.type === 'sou'),
        honors: TILES.filter(t => t.type === 'honors'),
    };

    // 타일 타입별로 표시할 한글 라벨 반환
    const getTypeLabel = (type: string) => {
        switch (type) {
            case 'man': return '만수패 (萬)';
            case 'pin': return '통수패 (筒)';
            case 'sou': return '삭수패 (索)';
            case 'honors': return '자패 (바람/삼원패)';
            default: return type;
        }
    };

    return (
        <section className="grid grid-cols-1 gap-6 sm:gap-8">
            {Object.entries(tilesByType).map(([type, tiles]) => (
                <div key={type} className="bg-[#0f281e]/40 p-4 sm:p-6 md:p-8 rounded-2xl border border-[#ffffff]/5 relative overflow-hidden group hover:bg-[#0f281e]/60 transition-colors duration-300">
                    <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-[#d4af37] flex items-center justify-center gap-4 border-b border-[#ffffff]/10 pb-4">
                        <span className={`w-2 h-6 sm:h-8 rounded-full ${type === 'man' ? 'bg-[#8a1c1c]' : type === 'pin' ? 'bg-[#1c3d5c]' : type === 'sou' ? 'bg-[#1c5c2e]' : 'bg-[#d4af37]'}`}></span>
                        {getTypeLabel(type)}
                    </h3>
                    <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-5 justify-center">
                        {tiles.map((tile) => (
                            <Tile
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
    );
}
