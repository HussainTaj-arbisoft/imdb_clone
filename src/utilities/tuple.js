export default function parseTuple(t) {
  return JSON.parse(
    t.replace(/\(/g, "[").replace(/\)/g, "]").replace(/'/g, '"')
  );
}
