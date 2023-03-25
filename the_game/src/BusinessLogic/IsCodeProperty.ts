export function isCodeProperty(prop: string): prop is string {
  const firstLetter = prop.charAt(0);
  const secondLetter = prop.charAt(1);
  const regexFirst = /^([BE])$/;
  const regexSecond = /^([PLAR])$/;
  if (regexFirst.test(firstLetter) && regexSecond.test(secondLetter)) {
    const theRest = prop.slice(2);
    if (regexFirst.test('B')) {
      switch (secondLetter) {
        case 'P':
          // NOTE: Here it is the Path cards
          // NESWCR Mandatory (F or T)
          // RGS Optional
          const regexP = /^([TF]{6}([RGS])?)$/;
          // const regexP = /^([TF]{6})([RGS]?)$/;
          return regexP.test(theRest);
        case 'L':
          const regexL = /^([MS])$/;
          return regexL.test(theRest);
        case 'A':
          const regexA = /^([DMGEB]|[LAC][FT])$/;
          return regexA.test(theRest);
        case 'R':
          // Here is the Reward:
          // TFF means 3 Gold
          // FTF means 2 Gold
          // FFT means 1 Gold
          const regexR = /^(?=.*T)[TF]{3}$/;
          return regexR.test(theRest);
        default:
          console.info('Default case');
          console.info(`The second letter is: ${secondLetter}`);
          console.log(prop);
          return false;
      }
    } else if (regexFirst.test('E')) {
      // TODO: Here it is the Extension cards
      console.info('It is an extension card');
      return false;
    }
  } else {
    console.log(prop);
    console.info("It didn't passed the first 2 chars");
    return false;
  }
  return false;
}
