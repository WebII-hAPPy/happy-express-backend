import { User } from "../entity/User";
import {
  IEmotion,
  IAccessory,
  IMakeup,
  IFacialHair,
  IHair
} from "./AzureResponse";

export interface IAnalysis {
  user: User;
  time: Date;
  emotion: IEmotion;
  smile: number;
  accessories: IAccessory[];
  makeup: IMakeup;
  glasses: string;
  gender: string;
  age: number;
  facialHair: IFacialHair;
  hair: IHair;
}
