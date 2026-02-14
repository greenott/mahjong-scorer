
import React from 'react';
import { Tile as TileType } from '../utils/mahjong';

interface TileProps {
    tile: Omit<TileType, 'id'>;
    onClick?: () => void;
    selected?: boolean;
    className?: string; // Optional for additional styling
}


export function Tile({ tile, onClick, selected, className = '' }: TileProps) {
    return (
        <div
            onClick={onClick}
            className={`
        relative
        w-[5rem] h-[7rem] md:w-24 md:h-36 
        bg-[#fdfcf5]  
        rounded-lg 
        flex items-center justify-center 
        text-8xl md:text-[8rem] 
        cursor-pointer 
        transition-all duration-200
        select-none
            overflow-hidden
            border-b-4 border-r-2 border-[#b8b8b8]
            active:border-b-0 active:border-r-0 active:translate-y-1 active:translate-x-[2px]
            hover:-translate-y-1
            shadow-[2px_4px_6px_rgba(0,0,0,0.3)]
            ${selected ? 'ring-4 ring-yellow-400 ring-offset-2 ring-offset-[#0f281e]' : ''}
            ${className}
          `}
        >
            {/* Tile Backing Texture Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/80 to-transparent rounded-lg pointer-events-none" />

            <span className={`
                relative z-10 transform scale-[3] md:scale-[3.5] origin-center 
                ${tile.type === 'man' ? 'text-[#8a1c1c]' :
                    tile.type === 'sou' ? 'text-[#1c5c2e]' :
                        tile.type === 'pin' ? 'text-[#1c3d5c]' :
                            'text-[#1a1a1a]'} 
                drop-shadow-sm font-serif
            `}>
                {tile.label}
            </span>
        </div>
    );
}
