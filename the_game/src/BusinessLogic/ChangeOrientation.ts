import { CharTuple } from '../Types/DexType';

export function changeOrientation(code: string): CharTuple | string {
  //This is working from my testing
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
      //Changing N with S and E with W
      codeArr = [B, P, S, W, N, E, C, R];
    }
    return codeArr as CharTuple;
  } else {
    console.log("You're not supposed to see this.");
  }
  return codeArr as CharTuple;
}
