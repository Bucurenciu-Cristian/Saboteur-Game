import { CharTuple } from '@src/Types/DexType';

export function changeOrientation(code: string): CharTuple | string {
  const secondLetter = code.charAt(1);
  const eightChar = code.charAt(7);

  if (secondLetter === 'P' && (eightChar === 'T' || eightChar === 'F')) {
    let codeArr = code.split('');
    // eslint-disable-next-line prefer-const
    let [B, P, N, E, S, W, C, R] = codeArr;

    R = R === 'T' ? 'F' : 'T';

    if (R === 'T') {
      // Changing N with S and E with W
      [N, E, S, W] = [S, W, N, E];
    }

    codeArr = [B, P, N, E, S, W, C, R];
    return codeArr as CharTuple;
  }

  console.warn("You're not supposed to see this.");
  return code.split('') as CharTuple;
}

/*
export function changeOrientation(code: string): CharTuple | string {
  // This is working from my testing
  const secondLetter = code.charAt(1);
  const eightChar = code?.charAt(7);
  let codeArr = code.split('');
  const regexSixth = /^([TF])$/;
  const regexSecond = /^(P)$/;
  if (regexSecond.test(secondLetter) && regexSixth.test(eightChar)) {
    let [B, P, N, E, S, W, C, R] = [...codeArr];
    if (R === 'T') {
      R = 'F';
      codeArr = [B, P, N, E, S, W, C, R];
    } else {
      R = 'T';
      // Changing N with S and E with W
      codeArr = [B, P, S, W, N, E, C, R];
    }
    return codeArr as CharTuple;
  }
  console.log("You're not supposed to see this.");

  return codeArr as CharTuple;
}
*/
