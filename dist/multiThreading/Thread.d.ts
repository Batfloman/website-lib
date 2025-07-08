export declare class Thread {
    blobURL: string;
    worker: Worker;
    constructor(workerFunc: Function, receiveFunc: Function);
    postMessage(message: any): void;
    terminate(): void;
}
