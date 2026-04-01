export interface EvalSummaryLike {
  empty?: boolean;
  prompt?: string;
  timestamp?: string;
  variant?: {
    agent?: string;
    model?: string;
    effort?: string;
  };
  execution?: {
    cost?: number;
    duration?: number;
    durationApi?: number;
    turns?: number;
  };
}

export interface TextContent {
  type: "text";
  text: string;
}

export interface ToolUseContent {
  type: "tool_use";
  id: string;
  name: string;
  input: Record<string, unknown>;
  isMCP: boolean;
}

export interface ToolResultBlock {
  type: string;
  text?: string;
  isError?: boolean;
}

export interface ToolResultContent {
  tool_use_id: string;
  type: "tool_result";
  content: string | ToolResultBlock[];
}

export interface MessageUsage {
  input_tokens: number;
  output_tokens: number;
}

export interface AssistantMessage {
  type: "assistant";
  message: {
    content: Array<TextContent | ToolUseContent>;
    usage: MessageUsage;
  };
  ms: number;
  tokenCount?: number;
}

export interface UserMessage {
  type: "user";
  message: {
    content: ToolResultContent[];
  };
  ms: number;
  tokenCount?: number;
}

export interface SystemMessage {
  type: "system";
  subtype: "init";
  agent: string;
  model: string;
  tools: string[];
  mcp_servers: Array<{
    name: string;
    status: "connected" | "disconnected" | "unknown";
  }>;
  cwd: string;
  ms: number;
  tokenCount?: number;
}

export interface ResultMessage {
  type: "result";
  subtype: "success" | "error";
  duration_ms: number;
  duration_api_ms: number;
  num_turns: number;
  total_cost_usd: number;
  ms: number;
  tokenCount?: number;
}

export type TranscriptMessage =
  | AssistantMessage
  | UserMessage
  | SystemMessage
  | ResultMessage;

export interface TranscriptProps {
  transcript: unknown[];
  summary?: EvalSummaryLike;
}
