import { createClaudeToolsAgent, messages, tool } from "@anthropic-ai/claude-code";

const echo = tool({
  name: "echo",
  description: "Echoes back user input.",
  inputSchema: {
    message: {
      type: "string",
      description: "What to echo back to the user"
    }
  },
  execute: async ({ message }) => {
    return { result: `Echo: ${message}` };
  }
});

const agent = createClaudeToolsAgent({
  tools: [echo],
  model: "claude-3-opus-20240229",
  system: "You're a helpful agent that echoes input and can use tools."
});

const thread = messages();

await thread.addUserMessage("Please echo this sentence back to me.");
const reply = await agent.run(thread);

console.log(reply.modelMessage.content);
