import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import Icon from "../Icon";
import { TextInputWithGlyph } from ".";

const meta = {
  component: TextInputWithGlyph,
  tags: ["ai-generated"],
} satisfies Meta<typeof TextInputWithGlyph>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SearchInput: Story = {
  args: {
    "aria-label": "Task ID",
    icon: <Icon glyph="MagnifyingGlass" />,
    label: "Task ID",
    placeholder: "Search tasks",
  },
  play: async ({ canvas, userEvent }) => {
    const input = canvas.getByLabelText("Task ID", { selector: "input" });
    await expect(input).toBeVisible();
    await userEvent.type(input, "compile");
    await expect(input).toHaveValue("compile");
  },
};

export const PersistentPlaceholder: Story = {
  args: {
    "aria-label": "Log URL",
    label: "Log URL",
    persistentPlaceholder: "https://evergreen.mongodb.com/",
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByText("https://evergreen.mongodb.com/"),
    ).toBeVisible();
    await expect(
      canvas.getByLabelText("Log URL", { selector: "input" }),
    ).toBeVisible();
  },
};
