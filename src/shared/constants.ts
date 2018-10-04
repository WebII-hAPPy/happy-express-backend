const DB_NAME: string = "db.json";
const COLLECTION_NAME: string = "images";
const UPLOAD_PATH: string = "uploads";

const URI_BASE: string = "westeurope.api.cognitive.microsoft.com";
const OCP_APIM_SUBSCRIPTION_KEY: string = "2f43ea3609644ba99c3a8cdae4382178";

const URL_BASE: string =
  process.env.NODE_ENV === "dev"
    ? "localhost:3000"
    : "https://backend.happy-service.ml/";

export {
  DB_NAME,
  COLLECTION_NAME,
  UPLOAD_PATH,
  URI_BASE,
  OCP_APIM_SUBSCRIPTION_KEY,
  URL_BASE
};
