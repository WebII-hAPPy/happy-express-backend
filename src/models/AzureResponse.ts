export interface IAzureResponse {
  faceId: string;
  faceRectangle: IFaceRectangle;
  faceAttributes: IFaceAttributes;
}

export interface IFaceRectangle {
  top: number;
  left: number;
  width: number;
  height: number;
}

export interface IFaceAttributes {
  smile: number;
  gender: string;
  age: number;
  facialHair: IFacialHair;
  glasses: string;
  emotion: IEmotion;
  makeup: IMakeup;
  accessories: IAccessory[];
  hair: IHair;
}

export interface IFacialHair {
  moustache: number;
  beard: number;
  sideburns: number;
}

export interface IEmotion {
  anger: number;
  contempt: number;
  disgust: number;
  fear: number;
  happiness: number;
  neutral: number;
  sadness: number;
  surprise: number;
}

export interface IMakeup {
  eyeMakeup: boolean;
  lipMakeup: boolean;
}

export interface IHair {
  bald: number;
  invisible: boolean;
  hairColor: IHairColor[];
}

export interface IHairColor {
  color: string;
  confidence: number;
}

export interface IAccessory {
  type: string;
  confidence: number;
}
