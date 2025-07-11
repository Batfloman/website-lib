export class Thread {
    constructor(workerFunc, receiveFunc) {
        var blob = new Blob([`onmessage = ${workerFunc.toString()}`], { type: "text/javascript" });
        this.blobURL = window.URL.createObjectURL(blob);
        this.worker = new Worker(this.blobURL, { type: "module" });
        this.worker.onmessage = (e) => receiveFunc(e);
    }
    postMessage(message) {
        this.worker.postMessage(message);
    }
    terminate() {
        this.worker.terminate();
        window.URL.revokeObjectURL(this.blobURL);
    }
}
