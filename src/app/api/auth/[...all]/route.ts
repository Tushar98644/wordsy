import { auth } from "@/config/auth/auth";
import { toNextJsHandler } from "better-auth/next-js";
 
export const { GET, POST } = toNextJsHandler(auth.handler);