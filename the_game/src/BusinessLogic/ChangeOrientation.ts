import { CharTuple } from '@src/Types/DexType';
import { Modes } from '@src/enums';

export function changeOrientation(code: CharTuple | string): CharTuple | string {
  const [B, P, N, E, S, W, C, R] = code;
  let winning;
  if (code.length > 8) {
    winning = code[8];
  }
  if (P === Modes.Path && (R === Modes.True || R === Modes.False)) {
    const newR = R === Modes.True ? Modes.False : Modes.True;
    let newOrientation;
    if (code.length > 8) {
      newOrientation = [B, P, S, W, N, E, C, newR, winning];
    } else {
      newOrientation = [B, P, S, W, N, E, C, newR];
    }

    return newOrientation as CharTuple;
  }

  console.warn("You're not supposed to see this.");
  return code as CharTuple;
}
