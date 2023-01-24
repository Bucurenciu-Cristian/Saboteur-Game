// Path: src/Types/Cards.ts
import {StaticImageData} from "next/image";
import {PathOrAction} from "./Cards";

export interface CardsType extends PathOrAction{
  src: StaticImageData;
  back: StaticImageData;
}
