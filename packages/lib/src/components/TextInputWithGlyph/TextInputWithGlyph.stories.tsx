import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { Icon } from "@leafygreen-ui/icon";
import { TextInputWithGlyph } from "./index";

const meta = {
  component: TextInputWithGlyph,
  tags: ["ai-generated"],
  parameters: {
    layout: "centered",
  },
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
    placeholder: "Search...",
    icon: <Icon glyph="MagnifyingGlass" />,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByLabelText("Search")).toBeVisible();
  },
};

export const WithPersistentPlaceholder: Story = {
  args: {
    label: "Duration",
    persistentPlaceholder: "hours",
    placeholder: "",
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByLabelText("Duration")).toBeVisible();
    await expect(canvas.getByText("hours")).toBeVisible();
  },
};
