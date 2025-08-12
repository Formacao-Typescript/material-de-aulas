// Essa é a implementação da nossa função chunk
// definida no arquivo 0-monkey-patching.d.ts
if (!Array.prototype.chunk) {
  Array.prototype.chunk = function (size: number) {
    if (size < 1) throw new TypeError("Size must be >= 1 to chunk");
    const result: unknown[][] = [];
    for (let i = 0; i < this.length; i += size) {
      result.push(this.slice(i, i + size));
    }
    return result;
  };
}
