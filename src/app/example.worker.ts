/// <reference lib="webworker" />

import { longOperation } from "./long-operation";

addEventListener('message', ({ data }) => {
    const result:string = longOperation(data);
  postMessage(result);
});
