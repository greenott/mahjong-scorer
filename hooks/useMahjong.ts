import { useState } from 'react';
import { Tile, HandStatus, Furo, FuroType, ScoreResult } from '../types';
import { handToRiichiString } from '../utils/mahjong';
import Riichi from 'riichi';

export function useMahjong() {
    // 현재 들고 있는 패 (최대 14개)
    const [hand, setHand] = useState<Tile[]>([]);
    // 점수 계산 결과
    const [result, setResult] = useState<ScoreResult | null>(null);
    // 에러 메시지
    const [error, setError] = useState<string | null>(null);

    // 대국(게임) 설정 상태
    const [handStatus, setHandStatus] = useState<HandStatus>({
        winType: 'tsumo', // 화료 방법 (쯔모/론)
        windField: 1, // 장풍 (1: 동, 2: 남)
        windPlayer: 1, // 자풍 (1: 동, 2: 남, 3: 서, 4: 북)
        riichi: 0, // 리치 여부 (0: 없음, 1: 리치, 2: 더블 리치)
        doraCount: 0, // 도라 개수
        honba: 0, // 본장
        isIppatsu: false, // 일발
        isChankan: false, // 창깡
        isRinshan: false, // 영상개화
        isHaiteiHoutei: false, // 해저로월/하저로어
    });

    // 울어놓은 패(후로) 목록
    const [furoSets, setFuroSets] = useState<Furo[]>([]);
    // 울기(치, 퐁, 깡)를 위해 선택한 패들의 ID 목록
    const [selectedTiles, setSelectedTiles] = useState<string[]>([]);

    // 패를 내 손에 추가하는 함수
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

    // 내 손에서 특정 패를 제거하는 함수
    const removeFromHand = (id: string) => {
        setHand(hand.filter(t => t.id !== id));
        setFuroSets(furoSets.map(set => ({
            ...set,
            tiles: set.tiles.filter(t => t.id !== id)
        })).filter(set => set.tiles.length >= 3)); // 3개 미만이 되면 후로 취소

        setSelectedTiles(selectedTiles.filter(tId => tId !== id));
        setResult(null);
        setError(null);
    };

    // 치, 퐁, 깡 등을 위해 패를 선택/해제하는 함수
    const toggleTileSelection = (id: string) => {
        // 가장 마지막에 추가된 패를 클릭하면 제거
        if (hand.length > 0 && hand[hand.length - 1].id === id) {
            removeFromHand(id);
            return;
        }

        if (selectedTiles.includes(id)) {
            setSelectedTiles(selectedTiles.filter(tId => tId !== id));
        } else {
            setSelectedTiles([...selectedTiles, id]);
        }
    };

    // 치, 퐁, 깡을 선언하는 함수
    const declareFuro = (type: FuroType) => {
        if (selectedTiles.length < 3) {
            setError('치, 퐁, 깡을 선언하려면 최소 3개의 패를 선택해야 합니다.');
            return;
        }

        const tilesToSet = hand.filter(t => selectedTiles.includes(t.id));

        // 선택된 패를 '공개(isOpen)' 상태로 변경
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

    // 점수를 계산하는 함수
    const calculateScore = () => {
        if (hand.length !== 14) {
            setError('점수를 계산하려면 14개의 패가 필요합니다.');
            return;
        }

        try {
            // 패와 상태를 riichi 라이브러리가 이해할 수 있는 문자열로 변환
            const riichiString = handToRiichiString(hand, handStatus, furoSets);

            // 기본 점수 계산 (riichi 라이브러리 사용)
            const baseScore = new Riichi(riichiString).calc();

            if (baseScore.error) {
                setError('계산 실패. 패가 유효한 역이 없거나 구성이 잘못되었습니다.');
                return;
            }

            // 도라 및 여러 추가 조건 적용
            let finalTen = baseScore.ten;
            const finalYaku = { ...baseScore.yaku };
            let finalHan = baseScore.han;

            // 추가 상황 (일발, 창깡, 영상개화, 해저/하저) 적용
            if (baseScore.isAgari && baseScore.han > 0) {
                if (handStatus.isIppatsu && handStatus.riichi > 0) {
                    finalYaku['Ippatsu'] = '1飜';
                    finalHan += 1;
                }

                if (handStatus.isChankan && handStatus.winType === 'ron') {
                    finalYaku['Chankan'] = '1飜';
                    finalHan += 1;
                }

                if (handStatus.isRinshan) {
                    finalYaku['Rinshan'] = '1飜';
                    finalHan += 1;
                }

                if (handStatus.isHaiteiHoutei) {
                    if (handStatus.winType === 'tsumo') {
                        finalYaku['Haitei'] = '1飜';
                    } else {
                        finalYaku['Houtei'] = '1飜';
                    }
                    finalHan += 1;
                }
            }

            // 본장 점수 계산 (쯔모, 론 모두 1본장 당 전체 300점 추가)
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

        } catch (e: unknown) {
            console.error(e);
            setError('계산 중 오류가 발생했습니다.');
        }
    };

    // 패를 모두 초기화하는 함수
    const clearHand = () => {
        setHand([]);
        setFuroSets([]);
        setSelectedTiles([]);
        setResult(null);
        setError(null);
    };

    return {
        hand,
        result,
        error,
        handStatus,
        furoSets,
        selectedTiles,
        setHandStatus,
        setResult,
        setError,
        setSelectedTiles,
        addToHand,
        removeFromHand,
        toggleTileSelection,
        declareFuro,
        calculateScore,
        clearHand,
    };
}
