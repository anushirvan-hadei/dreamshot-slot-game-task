import { Slot } from "./Slot";

// Configuration
const COUNT = 1000;
const betAmount = 1;

const slot = new Slot();

console.log("=============== START SIMULATION ===============");
console.log("Config:");
console.log("Count of spins:", COUNT);
console.log("Bet amount:", betAmount);

let totalBet = 0;
let totalWin = 0;
let executionStart = performance.now();
for (let i = 0; i < COUNT; i++) {
    totalBet += betAmount;
    const result = slot.spin(betAmount);
    totalWin += result.winAmount;
}
let executionEnd = performance.now();
console.log("================ END SIMULATION ================");

console.log("Results:")
console.log("Total bets", totalBet);
console.log("Total wins", totalWin);
console.log("RTP (%)", (totalWin / totalBet) * 100);
console.log("Execution Time (ms):", executionEnd - executionStart)
