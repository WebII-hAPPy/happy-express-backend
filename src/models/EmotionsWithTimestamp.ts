import { IEmotion } from "./AzureResponse";

export interface IEmotionWithTimestamp {
  id: number;
  timestamp: Date;
  emotions: IEmotion;
}
