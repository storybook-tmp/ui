import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import Icon from "../Icon";
import { TextInputWithGlyph } from ".";

const meta = {
  component: TextInputWithGlyph,
  tags: ["ai-generated"],
  decorators: [
    (Story) => (
      <div style={{ width: 360 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof TextInputWithGlyph>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SearchWithIcon: Story = {
  args: {
    "aria-label": "Search tasks",
    "aria-labelledby": "search-tasks-label",
    icon: <Icon glyph="MagnifyingGlass" />,
    label: "Search tasks",
    placeholder: "Search by task name",
  },
  play: async ({ canvas, userEvent }) => {
    const input = canvas.getByPlaceholderText("Search by task name");
    await userEvent.type(input, "compile");
    await expect(input).toHaveValue("compile");
  },
};

export const PersistentPrefix: Story = {
  args: {
    "aria-label": "Task identifier",
    "aria-labelledby": "task-identifier-label",
    label: "Task identifier",
    persistentPlaceholder: "Task ID:",
  },
};

export const CssCheck: Story = {
  args: {
    "aria-label": "Prefixed task identifier",
    "aria-labelledby": "prefixed-task-identifier-label",
    label: "Prefixed task identifier",
    persistentPlaceholder: "Task ID:",
  },
  play: async ({ canvas, canvasElement }) => {
    const placeholder = canvas.getByText("Task ID:");
    await expect(getComputedStyle(placeholder).opacity).toBe("0.5");
    await expect(getComputedStyle(canvasElement.ownerDocument.body).margin).toBe(
      "0px",
    );
  },
};
