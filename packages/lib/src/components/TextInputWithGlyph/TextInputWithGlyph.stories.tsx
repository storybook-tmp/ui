import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import Icon from "../Icon";
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
    const input = canvas.getByLabelText("Search");
    await expect(input).toBeVisible();
  },
};

export const WithUserInput: Story = {
  args: {
    label: "Email",
    placeholder: "Enter your email",
  },
  play: async ({ canvas, userEvent }) => {
    const input = canvas.getByLabelText("Email");
    await userEvent.type(input, "user@example.com");
    await expect(input).toHaveValue("user@example.com");
  },
};
