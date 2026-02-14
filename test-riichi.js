
const Riichi = require('riichi');

const hand = '1s2s3s4s5s6s7s8s9s1m1m1m2m'; // Invalid hand? 14 tiles
// let's try a standard hand: 123m 456m 789m 123p 11s -> 14 tiles
const validHand = '1m2m3m4m5m6m7m8m9m1p2p3p1s1s';
// Actually riichi needs to know the winning tile or if it's tsumo/ron?
// The syntax usually allows specifying extra options.
// But standard 'riichi(hand).calc()' should return something.

try {
    const result = new Riichi(validHand).calc();
    console.log(JSON.stringify(result, null, 2));
} catch (e) {
    console.error(e);
}
