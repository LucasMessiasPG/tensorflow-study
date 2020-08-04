
import * as tf from "@tensorflow/tfjs";

const MAX_LENGTH = 64;

export default class ReplayMemory{
  buffer: any[];
  index = 0;
  length = 0;
  bufferIndices_: any[];

  constructor(){
    this.buffer = [];
    for(let i = 0; i < MAX_LENGTH; ++i){
      this.buffer.push(null);
    }

    this.bufferIndices_ = [];
    for (let i = 0; i < MAX_LENGTH; ++i) {
      this.bufferIndices_.push(i);
    }
  }

  append(item: any){
    this.buffer[this.index] = item;
    this.length = Math.min(this.length + 1, MAX_LENGTH);
    this.index = (this.index + 1) % MAX_LENGTH;
  }

  sample(batchSize: number){
    if(batchSize > MAX_LENGTH) throw new Error(`batchSize (${batchSize}) exceed buffer length (${MAX_LENGTH})`)
    tf.util.shuffle(this.bufferIndices_);
    const out = [];
    for(let i = 0; i < batchSize; ++i ){
      out.push(this.buffer[this.bufferIndices_[i]]);
    }
    return out;
  }
  
}