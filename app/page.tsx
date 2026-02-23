'use client';

import { useMahjong } from '@/hooks/useMahjong';
import { MatchSettings } from '@/components/MatchSettings';
import { HandDisplay } from '@/components/HandDisplay';
import { ActionControls } from '@/components/ActionControls';
import { TilePicker } from '@/components/TilePicker';
import { ErrorModal } from '@/components/ErrorModal';
import { ResultModal } from '@/components/ResultModal';

export default function Home() {
    const {
        hand,
        result,
        error,
        handStatus,
        selectedTiles,
        setHandStatus,
        setResult,
        setError,
        setSelectedTiles,
        addToHand,
        toggleTileSelection,
        declareFuro,
        calculateScore,
        clearHand,
    } = useMahjong();

    return (
        <main className="min-h-screen p-4 md:p-8 bg-transparent text-[#e8e8e3] selection:bg-[#d4af37]/30">
            <div className="max-w-7xl mx-auto space-y-4 md:space-y-6 pb-4 md:pb-6">
                {/* Header */}
                <header className="text-center pt-8 pb-4 border-b border-[#d4af37]/20">
                    <h1 className="text-5xl md:text-7xl font-black mb-4 text-[#d4af37] drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] tracking-tight">
                        <span className="inline-block hover:scale-110 transition-transform cursor-default">🀄</span> 마작 점수 계산기
                    </h1>
                    <p className="text-[#a3b8b0] text-xl font-light tracking-wide">
                        점수 계산하다가 싸우지 마세요
                    </p>
                </header>

                <MatchSettings
                    handStatus={handStatus}
                    setHandStatus={setHandStatus}
                />
            </div>

            <div className="max-w-7xl mx-auto space-y-4 md:space-y-6 pb-20">
                <HandDisplay
                    hand={hand}
                    selectedTiles={selectedTiles}
                    toggleTileSelection={toggleTileSelection}
                />

                <ActionControls
                    selectedTilesLength={selectedTiles.length}
                    handLength={hand.length}
                    declareFuro={declareFuro}
                    setSelectedTiles={setSelectedTiles}
                    clearHand={clearHand}
                    calculateScore={calculateScore}
                />

                <TilePicker
                    addToHand={addToHand}
                />
            </div>

            <footer className="text-center text-[#a3b8b0]/40 text-sm pb-8 font-light tracking-widest uppercase">
                Mahjong Scorer &copy; {new Date().getFullYear()}
            </footer>

            <ErrorModal error={error} setError={setError} />
            <ResultModal result={result} setResult={setResult} handStatus={handStatus} />
        </main>
    );
}
