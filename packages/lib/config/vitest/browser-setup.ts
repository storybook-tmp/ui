// Polyfill for browser environment
if (typeof globalThis.Buffer === "undefined") {
  globalThis.Buffer = {
    alloc: () => new Uint8Array(),
    from: () => new Uint8Array(),
    isBuffer: () => false,
    concat: () => new Uint8Array(),
  } as any;
}

// Polyfill EventEmitter for browser environment
if (typeof globalThis.EventEmitter === "undefined") {
  class EventEmitter {
    private listeners: Map<string, Function[]> = new Map();

    on(event: string, listener: Function) {
      if (!this.listeners.has(event)) {
        this.listeners.set(event, []);
      }
      this.listeners.get(event)!.push(listener);
      return this;
    }

    off(event: string, listener: Function) {
      const list = this.listeners.get(event);
      if (list) {
        const index = list.indexOf(listener);
        if (index !== -1) {
          list.splice(index, 1);
        }
      }
      return this;
    }

    emit(event: string, ...args: any[]) {
      const list = this.listeners.get(event);
      if (list) {
        for (const listener of list) {
          listener(...args);
        }
      }
      return !!list;
    }

    once(event: string, listener: Function) {
      const wrapper = (...args: any[]) => {
        listener(...args);
        this.off(event, wrapper);
      };
      return this.on(event, wrapper);
    }

    removeAllListeners(event?: string) {
      if (event) {
        this.listeners.delete(event);
      } else {
        this.listeners.clear();
      }
      return this;
    }

    listenerCount(event: string) {
      const list = this.listeners.get(event);
      return list ? list.length : 0;
    }
  }

  globalThis.EventEmitter = EventEmitter as any;
}
