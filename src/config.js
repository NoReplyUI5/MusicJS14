import dotenv from "dotenv";
dotenv.config();
export default {
  token: process.env.TOKEN, //rename example.env > .env
  clientId: process.env.CLIENT_ID, //rename example.env > .env
};