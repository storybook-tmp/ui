import type { Meta, StoryObj } from "@storybook/react-vite";
import Icon from "../Icon";
import { TextInputWithGlyph } from ".";

const meta = {
  title: "AI Generated/Medium/TextInputWithGlyph",
  component: TextInputWithGlyph,
  args: {
    label: "Search",
    placeholder: "Find a task",
  },
} satisfies Meta<typeof TextInputWithGlyph>;

export default meta;

type Story = StoryObj<typeof meta>;

export const WithIcon: Story = {
  args: {
    icon: <Icon glyph="Warning" />,
  },
};

export const WithPersistentPlaceholder: Story = {
  args: {
    persistentPlaceholder: "evergreen/",
    placeholder: "project-name",
  },
};
