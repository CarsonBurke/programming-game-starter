export function findMinOf<T>(iterable: T[], condition: (item: T) => number): { score: number, item: T | undefined } {
    let minScore = Infinity;
    let minItem: T | undefined;

    for (const item of iterable) {
        const score = condition(item);
        if (score < minScore) {
            minScore = score;
            minItem = item;
        }
    }

    return { score: minScore, item: minItem! };
}

export function findMaxOf<T>(iterable: T[], condition: (item: T) => number): { score: number, item: T | undefined } {
    let maxScore = -Infinity;
    let maxItem: T | undefined;

    for (const item of iterable) {
        const score = condition(item);
        if (score > maxScore) {
            maxScore = score;
            maxItem = item;
        }
    }

    return { score: maxScore, item: maxItem! };
}
