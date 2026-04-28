import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import Icon from "../Icon";
import { TextInputWithGlyph } from "./index";

const meta: Meta<typeof TextInputWithGlyph> = {
  component: TextInputWithGlyph,
  tags: ["ai-generated"],
};

export default meta;
type Story = StoryObj<typeof TextInputWithGlyph>;

export const Default: Story = {
  args: {
    label: "Search",
    placeholder: "Type to search...",
  },
  play: async ({ canvas }) => {
    const input = canvas.getByLabelText("Search");
    await expect(input).toBeVisible();
  },
};

export const WithIcon: Story = {
  render: () => (
    <TextInputWithGlyph
      icon={<Icon glyph="MagnifyingGlass" />}
      label="Search"
      placeholder="Search items..."
    />
  ),
  play: async ({ canvas }) => {
    const input = canvas.getByLabelText("Search");
    await expect(input).toBeVisible();
    await expect(input).toHaveAttribute("placeholder", "Search items...");
  },
};

export const WithTyping: Story = {
  args: {
    label: "Email",
    placeholder: "Enter email",
  },
  play: async ({ canvas, userEvent }) => {
    const input = canvas.getByLabelText("Email");
    await userEvent.type(input, "user@example.com");
    await expect(input).toHaveValue("user@example.com");
  },
};
