export class Thread {
  blobURL: string;
  worker: Worker;

  constructor(workerFunc: Function, receiveFunc: Function) {
    var blob = new Blob([`onmessage = ${workerFunc.toString()}`], { type: "text/javascript" });

    this.blobURL = window.URL.createObjectURL(blob);

    this.worker = new Worker(this.blobURL, { type: "module" });
    this.worker.onmessage = (e) => receiveFunc(e);
  }

  postMessage(message: any): void {
    this.worker.postMessage(message);
  }

  terminate() {
    this.worker.terminate();
    window.URL.revokeObjectURL(this.blobURL);
  }
}