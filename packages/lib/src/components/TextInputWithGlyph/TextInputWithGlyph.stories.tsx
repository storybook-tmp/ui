import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import Icon from "@leafygreen-ui/icon";
import { TextInputWithGlyph } from "./index";

const meta = {
  component: TextInputWithGlyph,
  tags: ["ai-generated"],
} satisfies Meta<typeof TextInputWithGlyph>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Search",
    placeholder: "Type to search...",
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByLabelText("Search")).toBeVisible();
  },
};

export const WithIcon: Story = {
  args: {
    label: "Search",
    placeholder: "Type to search...",
    icon: <Icon glyph="MagnifyingGlass" />,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByLabelText("Search")).toBeVisible();
  },
};

export const WithTyping: Story = {
  args: {
    label: "Username",
    placeholder: "Enter username",
  },
  play: async ({ canvas, userEvent }) => {
    const input = canvas.getByLabelText("Username");
    await userEvent.type(input, "testuser");
    await expect(input).toHaveValue("testuser");
  },
};
