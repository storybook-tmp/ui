import type { Meta, StoryObj } from "@storybook/react-vite";
import { TextInputWithGlyph } from ".";
import Icon from "../Icon";

const meta = {
  title: "AI Generated/Medium/TextInputWithGlyph",
  component: TextInputWithGlyph,
} satisfies Meta<typeof TextInputWithGlyph>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Search",
    placeholder: "Type to search...",
  },
};

export const WithIcon: Story = {
  args: {
    label: "Search",
    placeholder: "Search...",
    icon: <Icon glyph="MagnifyingGlass" />,
  },
};
