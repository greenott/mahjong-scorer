import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { ScoreResult, HandStatus } from '../types';
import { YakuNameMap } from '../utils/mahjong';

interface ResultModalProps {
    result: ScoreResult | null;
    setResult: (result: ScoreResult | null) => void;
    handStatus: HandStatus;
}

export function ResultModal({ result, setResult, handStatus }: ResultModalProps) {
    const [mounted, setMounted] = useState(false);

    // 컴포넌트 마운트 처리 (Hydration 에러 방지용)
    useEffect(() => {
        setMounted(true);
    }, []);

    // 모달이 열려있을 때 스크롤 방지
    useEffect(() => {
        if (result) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [result]);

    if (!result || !mounted) return null;

    // 역 이름을 한글로 변환하는 헬퍼 함수
    const translateYaku = (name: string) => {
        return YakuNameMap[name] || name;
    };

    return createPortal(
        <div
            className="fixed z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in w-full h-full"
            style={{ top: 0, left: 0, marginTop: 0 }}
            onClick={() => setResult(null)}
        >
            <div className="bg-[#1a1a1a] max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-2xl border border-[#d4af37]/50 shadow-[0_0_50px_rgba(212,175,55,0.2)] relative scrollbar-thin scrollbar-thumb-[#d4af37]/50 scrollbar-track-transparent" onClick={e => e.stopPropagation()}>
                {/* 닫기 버튼 */}
                <button onClick={() => setResult(null)} className="absolute top-4 right-4 text-[#a3b8b0] hover:text-[#d4af37] transition-colors z-[60] p-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {/* 모달 헤더 (화료 결과 / 만관, 하네만 등의 명칭) */}
                <div className="bg-gradient-to-r from-[#2d1b18] to-[#3e2723] p-6 sm:p-8 border-b border-[#d4af37]/30">
                    <h3 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-[#d4af37] to-[#f7e7ce] bg-clip-text text-transparent drop-shadow-sm text-center mb-0 mt-2 sm:mt-0 sm:mb-4">
                        {result.isAgari ? (result.name ? translateYaku(result.name) : '화료 (Win)') : '점수 없음'}
                    </h3>
                </div>

                {/* 점수 디테일 바디 */}
                <div className="p-4 md:p-6 bg-[#0f281e] relative">
                    {/* 펠트 텍스처 배경 */}
                    <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'var(--felt-texture)' }}></div>

                    {/* 중앙 점수 영역, 칩스 및 역 목록 */}
                    <div className="max-w-2xl mx-auto space-y-4 md:space-y-6 relative z-10">
                        {/* 총 점수 및 판/부수 정보 */}
                        <div className="bg-black/30 p-6 rounded-xl border border-[#d4af37]/20 text-center backdrop-blur-sm">
                            <p className="text-[#d4af37]/80 uppercase tracking-widest text-sm font-semibold mb-2">총 점수</p>
                            <div className="text-6xl md:text-7xl font-black text-[#d4af37] drop-shadow-[0_0_15px_rgba(212,175,55,0.4)]">
                                {result.ten > 0 ? result.ten.toLocaleString() : 0}
                                <span className="text-2xl md:text-3xl text-[#a3b8b0] ml-2 font-light">점</span>
                            </div>
                            <div className="mt-4 text-[#a3b8b0] text-lg font-medium tracking-wide">
                                {result.name && (result.name.includes('Yakuman') || result.name.includes('役満'))
                                    ? translateYaku(result.name)
                                    : `${result.han || 0}판 ${result.fu || 0}부`
                                }
                            </div>
                        </div>

                        {/* 적용된 설정 칩 (태그) 들 */}
                        <div className="flex flex-wrap gap-2 pt-2">
                            <span className="bg-[#2d3a35]/80 px-3 py-1.5 rounded-full border border-[#ffffff]/10 text-sm font-medium text-[#e8e8e3] flex items-center gap-1.5 shadow-sm">
                                <span>🌬️</span> {handStatus.windField === 1 ? '동' : '남'}1국 / {handStatus.windPlayer === 1 ? '동' : handStatus.windPlayer === 2 ? '남' : handStatus.windPlayer === 3 ? '서' : '북'}가
                            </span>
                            <span className="bg-[#2d3a35]/80 px-3 py-1.5 rounded-full border border-[#ffffff]/10 text-sm font-medium text-[#e8e8e3] shadow-sm">
                                {handStatus.winType === 'tsumo' ? '🖐 쯔모' : '👉 론'}
                            </span>
                            {handStatus.doraCount > 0 && (
                                <span className="bg-[#4a3e1c]/80 px-3 py-1.5 rounded-full border border-[#d4af37]/30 text-sm font-bold text-[#d4af37] flex items-center gap-1.5 shadow-sm">
                                    <span>🌟</span> 도라 {handStatus.doraCount}
                                </span>
                            )}
                            {handStatus.honba > 0 && (
                                <span className="bg-[#2d3a35]/80 px-3 py-1.5 rounded-full border border-[#ffffff]/10 text-sm font-medium text-[#a3b8b0] shadow-sm">
                                    +{handStatus.honba} 본장
                                </span>
                            )}
                            {handStatus.riichi > 0 && (
                                <span className="bg-[#4a0e0e]/80 px-3 py-1.5 rounded-full border border-[#ff4444]/30 text-sm font-bold text-white flex items-center gap-1.5 shadow-sm">
                                    <span>🔥</span> {handStatus.riichi === 1 ? '리치' : '더블 리치'}
                                </span>
                            )}
                        </div>

                        {/* 목록 : 적용된 역 */}
                        <div className="bg-black/30 rounded-xl border border-[#ffffff]/10 overflow-hidden backdrop-blur-sm">
                            <div className="bg-[#ffffff]/5 px-6 py-3 text-lg font-semibold text-[#a3b8b0] flex items-center gap-2">
                                <span>📜</span> 적용된 역 (Yaku)
                            </div>
                            {result.yaku && Object.keys(result.yaku).length > 0 ? (
                                <ul className="divide-y divide-[#ffffff]/10">
                                    {Object.entries(result.yaku).map(([name, han]) => (
                                        <li key={name} className="flex justify-between items-center px-6 py-4 hover:bg-[#ffffff]/5 transition-colors">
                                            <span className="font-bold text-xl text-[#e8e8e3]">{translateYaku(name)}</span>
                                            <span className="font-mono text-[#d4af37] bg-[#d4af37]/10 px-3 py-1 rounded border border-[#d4af37]/20">
                                                {typeof han === 'string' && (String(han).includes('役満') || String(han).includes('Yakuman'))
                                                    ? translateYaku(String(han))
                                                    : `${String(han)} 판`}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <div className="p-8 text-center text-[#a3b8b0] italic">적용된 역이 없습니다.</div>
                            )}
                        </div>
                    </div>
                    {/* 확인 버튼 하단 배치 */}
                    <div className="pt-6 mt-4 border-t border-[#d4af37]/20 flex justify-center">
                        <button
                            onClick={() => setResult(null)}
                            className="w-full sm:w-auto px-12 py-4 bg-gradient-to-r from-[#d4af37] to-[#aa8c2c] hover:from-[#f7e7ce] hover:to-[#d4af37] text-black font-bold text-lg rounded-xl shadow-[0_0_15px_rgba(212,175,55,0.3)] transform transition-all active:scale-95"
                        >
                            확인
                        </button>
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
}
