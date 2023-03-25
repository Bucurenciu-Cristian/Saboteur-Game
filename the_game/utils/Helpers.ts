const stringifyAndParse = <T>(obj: T): string => JSON.stringify(obj);

export function stringify(params: any) {
  console.log(stringifyAndParse(params));
}

export function info<T>(params: T) {
  return stringifyAndParse(params);
}
