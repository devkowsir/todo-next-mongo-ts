export default function move<T>(arr: T[], from: number, to: number) {
  if (from === to || from > arr.length || to > arr.length) return arr;
  const temp = arr[from],
    res = [...arr];

  if (from > to) for (let i = from; i > to; i--) res[i] = res[i - 1];
  else for (let i = from; i < to; i++) res[i] = res[i + 1];

  res[to] = temp;

  return res;
}
