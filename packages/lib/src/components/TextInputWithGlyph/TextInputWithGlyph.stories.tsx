import type { Meta, StoryObj } from "@storybook/react-vite";
import { TextInputWithGlyph } from ".";
import Icon from "../Icon";

const meta = {
  component: TextInputWithGlyph,
  args: {
    label: "Input",
  },
} satisfies Meta<typeof TextInputWithGlyph>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <TextInputWithGlyph label="Search" placeholder="Type to search..." />
  ),
};

export const WithIcon: Story = {
  render: () => (
    <TextInputWithGlyph
      label="Search"
      placeholder="Search tasks..."
      icon={<Icon glyph="MagnifyingGlass" />}
    />
  ),
};

export const WithPersistentPlaceholder: Story = {
  render: () => (
    <TextInputWithGlyph
      label="Filter"
      persistentPlaceholder="e.g. task-name"
    />
  ),
};
