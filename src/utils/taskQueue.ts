/**
 * Priority = array order. The **last element is highest priority**.
 * Uses swap-delete so deletes/moves are O(1) (order not stable).
 */
export class UniqueTaskQueue<K extends number> {
  private arr: K[] = [];
  private pos: Map<K, number> = new Map();

  // --- queries ---
  
  task(): K | null {
    const n = this.arr.length;
    return n ? this.arr[n - 1] : null;
  }

  /** O(1) */
  hasTask(kind: K): boolean {
    return this.pos.has(kind);
  }

  /** O(1) */
  findIndex(kind: K): number {
    const i = this.pos.get(kind);
    return i === undefined ? -1 : i;
  }

  /** O(1) */
  size(): number {
    return this.arr.length;
  }

  // --- mutations ---

  /** O(1): append at end if not present; returns true if added */
  append(kind: K): boolean {
    if (this.pos.has(kind)) return false;
    const i = this.arr.length;
    this.arr.push(kind);
    this.pos.set(kind, i);
    return true;
  }

  /** O(1): remove by kind; returns true if removed */
  remove(kind: K): boolean {
    const i = this.pos.get(kind);
    if (i === undefined) return false;
    this.swapDeleteAt(i);
    return true;
  }

  /** O(1): remove and return highest-priority (end) */
  pop(): K | null {
    const n = this.arr.length;
    if (!n) return null;
    const k = this.arr[n - 1];
    this.arr.pop();
    this.pos.delete(k);
    return k;
  }

  /**
   * O(1): replace kind A with kind B at the same position.
   * Returns false if A missing or B already present.
   */
  replace(oldKind: K, newKind: K): boolean {
    const i = this.pos.get(oldKind);
    if (i === undefined || this.pos.has(newKind)) return false;
    this.arr[i] = newKind;
    this.pos.delete(oldKind);
    this.pos.set(newKind, i);
    return true;
  }

  /**
   * O(1): ensure kind exists and is the top priority (end).
   * If missing -> append; if present -> bump to end.
   */
  ensureAtEnd(kind: K): void {
    const i = this.pos.get(kind);
    if (i === undefined) {
      this.append(kind);
      return;
    }
    const last = this.arr.length - 1;
    if (i === last) return;
    const kLast = this.arr[last];
    // Move current to end by swapping with last
    this.arr[i] = kLast;
    this.pos.set(kLast, i);
    this.arr[last] = kind;
    this.pos.set(kind, last);
  }

  /** O(1): move a task to the front (index 0) by swapping */
  moveToFront(kind: K): boolean {
    const i = this.pos.get(kind);
    if (i === undefined || i === 0) return !!i || i === 0;
    const k0 = this.arr[0];
    this.arr[0] = kind;
    this.arr[i] = k0;
    this.pos.set(kind, 0);
    this.pos.set(k0, i);
    return true;
  }

  /** O(1): swap positions i and j (bounds-checked) */
  swap(i: number, j: number): boolean {
    const n = this.arr.length;
    if (i < 0 || j < 0 || i >= n || j >= n || i === j) return false;
    const ki = this.arr[i], kj = this.arr[j];
    this.arr[i] = kj; this.arr[j] = ki;
    this.pos.set(kj, i); this.pos.set(ki, j);
    return true;
  }

  /** O(1): clear all */
  clear(): void {
    this.arr.length = 0;
    this.pos.clear();
  }

  /** O(1): read-only snapshot (not O(1) if you copy; returns the backing array intentionally) */
  backingArray(): readonly K[] {
    return this.arr;
  }

  // --- internals ---

  /** O(1) swap-delete at index */
  private swapDeleteAt(i: number): void {
    const last = this.arr.length - 1;
    const k = this.arr[i];
    if (i !== last) {
      const kLast = this.arr[last];
      this.arr[i] = kLast;
      this.pos.set(kLast, i);
    }
    this.arr.pop();
    this.pos.delete(k);
  }
}
