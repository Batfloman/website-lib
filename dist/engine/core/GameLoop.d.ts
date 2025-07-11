export declare class GameLoop {
    private game;
    private lastTickTime;
    private isStopped;
    constructor(game: {
        update: (dt: number) => void;
    });
    start(): void;
    stop(): void;
    private loop;
}
