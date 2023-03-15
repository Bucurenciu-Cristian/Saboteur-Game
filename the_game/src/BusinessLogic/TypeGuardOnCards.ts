import {isCodeProperty} from "./IsCodeProperty";
import {ICardBasic} from "../Types/DexType";

export function TypeGuardOnCards({code}: ICardBasic) {
    if (typeof code !== "string") {
        code = code.join("");
    }
    if (!isCodeProperty(code)) {
        // throw new Error("Not a valid code",code);
        console.info("Not a valid code:", code);
    }
}
