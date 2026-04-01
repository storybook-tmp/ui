/* eslint-disable jsdoc/require-jsdoc */

import React from "react";
import type {
  AssistantMessage,
  EvalSummaryLike,
  ResultMessage,
  SystemMessage,
  TextContent,
  ToolResultBlock,
  ToolUseContent,
  TranscriptMessage,
  TranscriptProps,
  UserMessage,
} from "./transcript.types.ts";

type TranscriptDocData = {
  prompt: string;
  promptTokenCount: number;
  messages: TranscriptMessage[];
};

type ClaudeSystemEntry = {
  type: "system";
  subtype: "init";
  agent?: string;
  model?: string;
  tools?: unknown[];
  mcp_servers?: unknown;
  cwd?: string;
  ms?: number;
  tokenCount?: number;
};

type ClaudeAssistantEntry = {
  type: "assistant";
  message: {
    content: Array<
      | {
          type: "text";
          text: string;
        }
      | {
          type: "tool_use";
          id?: string;
          name: string;
          input: Record<string, unknown>;
        }
    >;
    usage?: {
      input_tokens?: number;
      output_tokens?: number;
    };
  };
  ms?: number;
  tokenCount?: number;
};

type ClaudeUserEntry = {
  type: "user";
  message: {
    content: Array<{
      type: "tool_result";
      tool_use_id?: string;
      content: unknown;
    }>;
  };
  ms?: number;
  tokenCount?: number;
};

type ClaudeResultEntry = {
  type: "result";
  subtype: "success" | "error";
  duration_ms?: number;
  duration_api_ms?: number;
  num_turns?: number;
  total_cost_usd?: number;
  ms?: number;
  tokenCount?: number;
};

type CodexCommandEntry = {
  type: "command_execution";
  command: string;
  aggregated_output?: string;
  exit_code?: number;
};

const containerStyle: React.CSSProperties = {
  fontFamily: "system-ui, sans-serif",
  padding: "2rem",
};

const sectionTitleStyle: React.CSSProperties = {
  fontSize: "1.125rem",
  fontWeight: 600,
  marginBottom: "1rem",
};

const cardStyle: React.CSSProperties = {
  border: "1px solid #e5e7eb",
  borderRadius: "8px",
  padding: "1rem",
  marginBottom: "1rem",
  background: "white",
};

const codeStyle: React.CSSProperties = {
  display: "block",
  margin: 0,
  whiteSpace: "pre-wrap",
  wordBreak: "break-word",
  fontSize: "0.875rem",
  lineHeight: 1.5,
  fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
};

export const Transcript = ({ transcript, summary }: TranscriptProps) => {
  if ((summary?.empty || !summary) && transcript.length === 0) {
    return (
      <div style={containerStyle}>
        <h1 style={{ marginTop: 0 }}>Transcript</h1>
        <p>No eval transcript yet.</p>
      </div>
    );
  }

  const data = normalizeTranscript({ transcript, summary });
  if (!data.prompt && data.messages.length === 0) {
    return (
      <div style={containerStyle}>
        <h1 style={{ marginTop: 0 }}>Transcript</h1>
        <p>No transcript data available.</p>
      </div>
    );
  }

  const system = data.messages.find((message) => message.type === "system") as
    | SystemMessage
    | undefined;
  const result = data.messages.find((message) => message.type === "result") as
    | ResultMessage
    | undefined;

  return (
    <div style={containerStyle}>
      <h1 style={{ marginTop: 0 }}>Transcript</h1>

      {(system || result) && (
        <>
          <h2 style={sectionTitleStyle}>Run Metadata</h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "1rem",
              marginBottom: "1.5rem",
            }}
          >
            {system && (
              <MetadataCard title="Agent" value={system.agent || "Unknown"} />
            )}
            {system && (
              <MetadataCard title="Model" value={system.model || "Unknown"} />
            )}
            {result && (
              <MetadataCard
                title="Turns"
                value={String(result.num_turns || 0)}
              />
            )}
            {result && (
              <MetadataCard
                title="Duration"
                value={formatDuration(result.duration_ms || 0)}
              />
            )}
          </div>
        </>
      )}

      {data.prompt && (
        <>
          <h2 style={sectionTitleStyle}>Prompt</h2>
          <div style={cardStyle}>
            <pre style={codeStyle}>{data.prompt}</pre>
          </div>
        </>
      )}

      <h2 style={sectionTitleStyle}>Events</h2>
      {data.messages.map((message, index) => (
        <MessageCard key={index} message={message} />
      ))}
    </div>
  );
};

const MetadataCard = ({ title, value }: { title: string; value: string }) => (
  <div style={{ ...cardStyle, marginBottom: 0 }}>
    <div
      style={{
        fontSize: "0.75rem",
        textTransform: "uppercase",
        color: "#6b7280",
      }}
    >
      {title}
    </div>
    <div style={{ fontSize: "1.25rem", fontWeight: 700 }}>{value}</div>
  </div>
);

const MessageCard = ({ message }: { message: TranscriptMessage }) => {
  if (message.type === "system") {
    return (
      <div style={cardStyle}>
        <strong>System</strong>
        <pre style={codeStyle}>{JSON.stringify(message, null, 2)}</pre>
      </div>
    );
  }

  if (message.type === "assistant") {
    return (
      <div style={cardStyle}>
        <strong>Assistant</strong>
        {message.message.content.map((content, index) =>
          content.type === "text" ? (
            <pre key={index} style={codeStyle}>
              {content.text}
            </pre>
          ) : (
            <div key={index}>
              <div style={{ fontWeight: 600, marginTop: "0.75rem" }}>
                {content.name}
              </div>
              <pre style={codeStyle}>
                {JSON.stringify(content.input, null, 2)}
              </pre>
            </div>
          ),
        )}
      </div>
    );
  }

  if (message.type === "user") {
    return (
      <div style={cardStyle}>
        <strong>Tool Result</strong>
        {message.message.content.map((content, index) => (
          <pre key={index} style={codeStyle}>
            {typeof content.content === "string"
              ? content.content
              : JSON.stringify(content.content, null, 2)}
          </pre>
        ))}
      </div>
    );
  }

  return (
    <div style={cardStyle}>
      <strong>Result</strong>
      <pre style={codeStyle}>{JSON.stringify(message, null, 2)}</pre>
    </div>
  );
};

function normalizeTranscript(opts: {
  transcript: unknown[];
  summary?: EvalSummaryLike;
}): TranscriptDocData {
  const prompt =
    typeof opts.summary?.prompt === "string" ? opts.summary.prompt : "";
  const messages = opts.transcript.flatMap((entry, index) =>
    normalizeTranscriptEntry(entry, index, opts.summary),
  );

  ensureSystemMessage(messages, opts.summary);
  ensureResultMessage(messages, opts.summary);

  return {
    prompt,
    promptTokenCount: estimateTokenCount(prompt),
    messages,
  };
}

function normalizeTranscriptEntry(
  entry: unknown,
  index: number,
  summary?: EvalSummaryLike,
): TranscriptMessage[] {
  if (!entry || typeof entry !== "object") {
    return [];
  }

  if (looksLikeClaudeSystem(entry)) return [normalizeClaudeSystem(entry)];
  if (looksLikeClaudeAssistant(entry)) return [normalizeClaudeAssistant(entry)];
  if (looksLikeClaudeUser(entry, index))
    return [normalizeClaudeUser(entry, index)];
  if (looksLikeClaudeResult(entry))
    return [normalizeClaudeResult(entry, summary)];
  if (looksLikeCodexCommand(entry)) return normalizeCodexCommand(entry, index);

  if (looksLikeCodexAgentMessage(entry)) {
    return [createAssistantTextMessage(entry.text)];
  }

  if (looksLikeCodexReasoning(entry)) {
    return [createAssistantTextMessage(`Reasoning\n\n${entry.text}`)];
  }

  if (looksLikeCodexFileChange(entry)) {
    const summaryText = [
      "File changes:",
      ...entry.changes.map((change) => `- ${change.kind} ${change.path}`),
    ].join("\n");
    return [createAssistantTextMessage(summaryText)];
  }

  if (looksLikeCodexError(entry)) {
    return [createAssistantTextMessage(`Error\n\n${entry.message}`)];
  }

  return [createAssistantTextMessage(JSON.stringify(entry, null, 2))];
}

function normalizeClaudeSystem(entry: ClaudeSystemEntry): SystemMessage {
  return {
    type: "system",
    subtype: "init",
    agent: entry.agent ?? "Claude",
    model: entry.model ?? "unknown",
    tools:
      entry.tools?.filter((tool): tool is string => typeof tool === "string") ??
      [],
    mcp_servers: normalizeMcpServers(entry.mcp_servers),
    cwd: entry.cwd ?? "",
    ms: getNumber(entry.ms),
    tokenCount: getOptionalNumber(entry.tokenCount),
  };
}

function normalizeClaudeAssistant(
  entry: ClaudeAssistantEntry,
): AssistantMessage {
  const content = entry.message.content.flatMap(
    (block): Array<TextContent | ToolUseContent> => {
      if (block.type === "text") {
        return [{ type: "text", text: block.text }];
      }

      if (block.type === "tool_use") {
        return [
          {
            type: "tool_use",
            id: typeof block.id === "string" ? block.id : `tool-${block.name}`,
            name: block.name,
            input: isRecord(block.input) ? block.input : {},
            isMCP: isMcpToolName(block.name),
          },
        ];
      }

      return [];
    },
  );

  return {
    type: "assistant",
    message: {
      content,
      usage: {
        input_tokens: getNumber(entry.message.usage?.input_tokens),
        output_tokens: getNumber(entry.message.usage?.output_tokens),
      },
    },
    ms: getNumber(entry.ms),
    tokenCount:
      getOptionalNumber(entry.tokenCount) ??
      estimateAssistantContentTokens(content),
  };
}

function normalizeClaudeUser(
  entry: ClaudeUserEntry,
  index: number,
): UserMessage {
  const content = entry.message.content.map((block, blockIndex) => ({
    type: "tool_result" as const,
    tool_use_id:
      typeof block.tool_use_id === "string"
        ? block.tool_use_id
        : `tool-result-${index}-${blockIndex}`,
    content: normalizeToolResultContent(block.content),
  }));

  return {
    type: "user",
    message: { content },
    ms: getNumber(entry.ms),
    tokenCount:
      getOptionalNumber(entry.tokenCount) ??
      content.reduce(
        (sum, block) => sum + estimateToolResultTokens(block.content),
        0,
      ),
  };
}

function normalizeClaudeResult(
  entry: ClaudeResultEntry,
  summary?: EvalSummaryLike,
): ResultMessage {
  return {
    type: "result",
    subtype: entry.subtype,
    duration_ms:
      getNumber(entry.duration_ms) ||
      Math.round(getNumber(summary?.execution?.duration) * 1000),
    duration_api_ms:
      getNumber(entry.duration_api_ms) ||
      Math.round(getNumber(summary?.execution?.durationApi) * 1000),
    num_turns:
      getNumber(entry.num_turns) || getNumber(summary?.execution?.turns),
    total_cost_usd:
      getNumber(entry.total_cost_usd) || getNumber(summary?.execution?.cost),
    ms: getNumber(entry.ms),
    tokenCount: getOptionalNumber(entry.tokenCount),
  };
}

function normalizeCodexCommand(
  entry: CodexCommandEntry,
  index: number,
): TranscriptMessage[] {
  const id = `codex-command-${index}`;
  const output = buildCodexCommandOutput(entry);

  return [
    {
      type: "assistant",
      message: {
        content: [
          {
            type: "tool_use",
            id,
            name: "Bash",
            input: { command: entry.command },
            isMCP: false,
          },
        ],
        usage: {
          input_tokens: 0,
          output_tokens: estimateTokenCount(entry.command),
        },
      },
      ms: 0,
      tokenCount: estimateTokenCount(entry.command),
    },
    {
      type: "user",
      message: {
        content: [{ type: "tool_result", tool_use_id: id, content: output }],
      },
      ms: 0,
      tokenCount: estimateToolResultTokens(output),
    },
  ];
}

function ensureSystemMessage(
  messages: TranscriptMessage[],
  summary?: EvalSummaryLike,
) {
  if (messages.some((message) => message.type === "system")) return;
  if (!summary?.variant) return;

  messages.unshift({
    type: "system",
    subtype: "init",
    agent: summary.variant.agent || "Agent",
    model: summary.variant.model || "unknown",
    tools: [],
    mcp_servers: [],
    cwd: "",
    ms: 0,
  });
}

function ensureResultMessage(
  messages: TranscriptMessage[],
  summary?: EvalSummaryLike,
) {
  if (messages.some((message) => message.type === "result")) return;
  if (!summary?.execution) return;

  messages.push({
    type: "result",
    subtype: "success",
    duration_ms: Math.round(getNumber(summary.execution.duration) * 1000),
    duration_api_ms: Math.round(
      getNumber(summary.execution.durationApi) * 1000,
    ),
    num_turns: getNumber(summary.execution.turns),
    total_cost_usd: getNumber(summary.execution.cost),
    ms: 0,
  });
}

function normalizeToolResultContent(
  content: unknown,
): string | ToolResultBlock[] {
  if (typeof content === "string") return content;
  if (Array.isArray(content)) {
    return content.map((item) => ({
      type:
        isRecord(item) && typeof item.type === "string" ? item.type : "text",
      text:
        isRecord(item) && typeof item.text === "string" ? item.text : undefined,
      isError: isRecord(item) && item.isError === true,
    }));
  }

  return JSON.stringify(content, null, 2);
}

function normalizeMcpServers(value: unknown): SystemMessage["mcp_servers"] {
  if (!Array.isArray(value)) return [];

  return value.flatMap((server) => {
    if (!isRecord(server) || typeof server.name !== "string") return [];

    const { status } = server;
    return [
      {
        name: server.name,
        status:
          status === "connected" ||
          status === "disconnected" ||
          status === "unknown"
            ? status
            : "unknown",
      },
    ];
  });
}

function buildCodexCommandOutput(entry: CodexCommandEntry) {
  const lines = [];

  if (typeof entry.exit_code === "number")
    lines.push(`Exit code: ${entry.exit_code}`);
  if (
    typeof entry.aggregated_output === "string" &&
    entry.aggregated_output.trim()
  ) {
    lines.push(entry.aggregated_output.trim());
  }
  if (lines.length === 0) lines.push(entry.command);

  return lines.join("\n\n");
}

function createAssistantTextMessage(text: string): AssistantMessage {
  const tokenCount = estimateTokenCount(text);

  return {
    type: "assistant",
    message: {
      content: [{ type: "text", text }],
      usage: { input_tokens: 0, output_tokens: tokenCount },
    },
    ms: 0,
    tokenCount,
  };
}

function estimateAssistantContentTokens(
  content: Array<TextContent | ToolUseContent>,
) {
  return content.reduce((sum, item) => {
    if (item.type === "text") return sum + estimateTokenCount(item.text);
    return (
      sum + estimateTokenCount(`${item.name}\n${JSON.stringify(item.input)}`)
    );
  }, 0);
}

function estimateToolResultTokens(content: string | ToolResultBlock[]) {
  if (typeof content === "string") return estimateTokenCount(content);
  return content.reduce(
    (sum, item) =>
      sum +
      estimateTokenCount([item.type, item.text].filter(Boolean).join("\n")),
    0,
  );
}

function estimateTokenCount(text: string) {
  if (!text.trim()) return 0;
  return Math.max(1, Math.ceil(text.length / 4));
}

function formatDuration(durationMs: number) {
  if (!durationMs) return "0s";
  if (durationMs < 1000) return `${durationMs}ms`;
  const totalSeconds = Math.round(durationMs / 1000);
  if (totalSeconds < 60) return `${totalSeconds}s`;
  return `${Math.floor(totalSeconds / 60)}m${totalSeconds % 60}s`;
}

function isMcpToolName(name: string) {
  return /^mcp/i.test(name) || name.includes("mcp__") || name.includes("mcp_");
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function getNumber(value: unknown) {
  return typeof value === "number" && Number.isFinite(value) ? value : 0;
}

function getOptionalNumber(value: unknown) {
  return typeof value === "number" && Number.isFinite(value)
    ? value
    : undefined;
}

function looksLikeClaudeSystem(entry: unknown): entry is ClaudeSystemEntry {
  return isRecord(entry) && entry.type === "system" && entry.subtype === "init";
}

function looksLikeClaudeAssistant(
  entry: unknown,
): entry is ClaudeAssistantEntry {
  return (
    isRecord(entry) &&
    entry.type === "assistant" &&
    isRecord(entry.message) &&
    Array.isArray(entry.message.content)
  );
}

function looksLikeClaudeUser(
  entry: unknown,
  index: number,
): entry is ClaudeUserEntry {
  return (
    isRecord(entry) &&
    entry.type === "user" &&
    isRecord(entry.message) &&
    Array.isArray(entry.message.content) &&
    index >= 0
  );
}

function looksLikeClaudeResult(entry: unknown): entry is ClaudeResultEntry {
  return (
    isRecord(entry) &&
    entry.type === "result" &&
    (entry.subtype === "success" || entry.subtype === "error")
  );
}

function looksLikeCodexAgentMessage(
  entry: unknown,
): entry is { type: "agent_message"; text: string } {
  return (
    isRecord(entry) &&
    entry.type === "agent_message" &&
    typeof entry.text === "string"
  );
}

function looksLikeCodexReasoning(
  entry: unknown,
): entry is { type: "reasoning"; text: string } {
  return (
    isRecord(entry) &&
    entry.type === "reasoning" &&
    typeof entry.text === "string"
  );
}

function looksLikeCodexCommand(entry: unknown): entry is CodexCommandEntry {
  return (
    isRecord(entry) &&
    entry.type === "command_execution" &&
    typeof entry.command === "string"
  );
}

function looksLikeCodexFileChange(entry: unknown): entry is {
  type: "file_change";
  changes: Array<{ kind: string; path: string }>;
} {
  return (
    isRecord(entry) &&
    entry.type === "file_change" &&
    Array.isArray(entry.changes)
  );
}

function looksLikeCodexError(
  entry: unknown,
): entry is { type: "error"; message: string } {
  return (
    isRecord(entry) &&
    entry.type === "error" &&
    typeof entry.message === "string"
  );
}
