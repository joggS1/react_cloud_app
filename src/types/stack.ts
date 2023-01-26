    interface IStack<T> {
    push(item: T): void;
    pop(): T | null;
    peek(): T | null;
    size(): number;
  }

  export class Stack<T> implements IStack<T> {
    private storage: T[] = [];
  
    constructor(private capacity: number = Infinity) {}
  
    push(item: T): void {
      if (this.size() === this.capacity) {
        throw Error("Stack has reached max capacity, you cannot add more items");
      }
      this.storage.push(item);
    }
  
    pop(): T | null {
      //@ts-ignore
      return this.storage.pop();
    }
  
    peek(): T | null {
      return this.storage[this.size() - 1];
    }
  
    size(): number {
      return this.storage.length;
    }
  }
export const StackObject = new Stack<string>()
