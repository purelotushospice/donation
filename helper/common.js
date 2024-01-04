export const fetcher = (...args) => fetch(...args).then((res) => res.json());
export function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
