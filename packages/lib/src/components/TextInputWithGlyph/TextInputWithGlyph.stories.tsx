import type { Meta, StoryObj } from "@storybook/react-vite";
import Icon from "../Icon";
import { TextInputWithGlyph } from ".";

const meta = {
  title: "AI Generated/Medium/TextInputWithGlyph",
  component: TextInputWithGlyph,
  args: {
    label: "Search",
    onChange: () => {},
    value: "",
  },
} satisfies Meta<typeof TextInputWithGlyph>;

export default meta;

type Story = StoryObj<typeof meta>;

export const WithIcon: Story = {
  args: {
    icon: <Icon glyph="MagnifyingGlass" />,
    placeholder: "Find a task",
  },
};

export const WithPersistentPlaceholder: Story = {
  args: {
    persistentPlaceholder: "mongodb/mongo ",
    placeholder: "task name",
  },
};
