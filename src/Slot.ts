import configuration from "../config/configuration";
import { SlotResult } from "./SlotResult";

export class Slot {
    spin(betAmount: number): SlotResult {
        // Extract random grid of reels
        const resultGrid = configuration.reels.map(reel => {
            const randomIndex = Math.floor(Math.random() * reel.length); // [0, reels.length)

            const endIndex = Math.min(randomIndex + configuration.rowsCount, reel.length);

            const array = reel.slice(randomIndex, endIndex);

            const remaining = randomIndex + configuration.rowsCount - reel.length;
            if (remaining > 0) {
                return array.concat(reel.slice(0, remaining));
            }

            return array;
        });

        // Calculate winning
        const winPerLine: number[] = configuration.lines.map(line => {
            const symbolsInLine = line.map((item, index) => {
                return resultGrid[index][item]
            })

            const occurrencesMap = symbolsInLine.reduce((acc, curr) => { // curr is the symbol
                if (acc[curr] == null) {
                    acc[curr] = 0;
                }
                acc[curr] += 1;
                return acc; // { 3: 1, 5: 1 }
            }, {});

            const entries: [string, number][] = Object.entries(occurrencesMap);

            let maxOccurrencesEntry = entries[0];
            entries.forEach(entry => {
                const value = entry[1];
                const maxOccValue = maxOccurrencesEntry[1];
                if (value > maxOccValue) {
                    maxOccurrencesEntry = entry;
                }
            })

            const [symbol, occurrences] = maxOccurrencesEntry;
            return configuration.symbols[symbol][occurrences - 1];
        })

        // Find the highest win
        let maxValue = winPerLine[0];
        winPerLine.forEach(win => {
            if (win > maxValue) {
                maxValue = win;
            }
        })

        return {
            betAmount,
            winAmount: maxValue,
            positions: resultGrid
        };
    }
}