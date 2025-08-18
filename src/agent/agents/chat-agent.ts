import { gemini } from "@/config/gemini";
import { Agent } from "@mastra/core/agent";

export const chatAgent = new Agent({
  name: "chatAgent",
  instructions: "You are a chat agent",
  model: gemini("gemini-2.5-flash"),
  tools: {},
});