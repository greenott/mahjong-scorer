import React from 'react';

interface ErrorModalProps {
    error: string | null;
    setError: (error: string | null) => void;
}

export function ErrorModal({ error, setError }: ErrorModalProps) {
    if (!error) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-md animate-fade-in" onClick={() => setError(null)}>
            <div className="bg-[#1a1a1a] max-w-md w-full rounded-t-3xl sm:rounded-2xl border border-[#ff4444]/50 shadow-[0_0_50px_rgba(255,68,68,0.2)] overflow-hidden relative pb-6 sm:pb-0 animate-slide-up sm:animate-scale-in" onClick={e => e.stopPropagation()}>
                {/* 모바일 손잡이 (핸들) */}
                <div className="sm:hidden w-12 h-1.5 bg-white/20 rounded-full mx-auto mt-3 mb-1"></div>

                {/* 닫기 버튼 */}
                <button onClick={() => setError(null)} className="absolute top-4 right-4 text-[#a3b8b0] hover:text-white transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {/* 에러 아이콘 및 메시지 */}
                <div className="text-5xl mb-4 text-center mt-6">⚠️</div>
                <h3 className="text-xl font-bold text-[#ff4444] mb-2 text-center">계산 실패</h3>
                <p className="text-[#e8e8e3] font-light leading-relaxed text-center px-6">{error}</p>

                {/* 확인 버튼 */}
                <div className="text-center">
                    <button onClick={() => setError(null)} className="mt-8 px-6 py-2 mb-6 bg-[#ff4444]/20 hover:bg-[#ff4444]/30 text-[#ff4444] rounded-lg transition-colors border border-[#ff4444]/30">
                        확인
                    </button>
                </div>
            </div>
        </div>
    );
}
