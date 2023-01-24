// Path: src/Types/PathCard.ts
import {CardsType} from "./CardsType";
import {PathOrAction} from "./Cards";

export interface PathCard extends CardsType {
  type?: string
  code?: number
}


