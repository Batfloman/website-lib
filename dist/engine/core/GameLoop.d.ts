export declare class GameLoop {
    private game;
    private lastTickTime;
    private isStopped;
    private maxDTPerTick;
    constructor(game: {
        tick: () => void;
    });
    start(): void;
    stop(): void;
    private loop;
}
