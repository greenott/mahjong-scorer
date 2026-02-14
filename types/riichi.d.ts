
declare module 'riichi' {
    export default class Riichi {
        constructor(hand: string);
        calc(): {
            isAgari: boolean;
            yaku: Record<string, string>;
            han: number;
            fu: number;
            ten: number;
            name: string;
            text: string;
            error: boolean;
        };
    }
}
