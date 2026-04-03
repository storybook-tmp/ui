import type { Meta, StoryObj } from "@storybook/react-vite";
import Icon from "../Icon";
import { TextInputWithGlyph } from ".";

const meta = {
  title: "AI Generated/Medium/TextInputWithGlyph",
  component: TextInputWithGlyph,
  parameters: {
    layout: "centered",
  },
  render: (args) => (
    <div style={{ width: 320 }}>
      <TextInputWithGlyph {...args} />
    </div>
  ),
} satisfies Meta<typeof TextInputWithGlyph>;

export default meta;

type Story = StoryObj<typeof meta>;

export const WithTrailingIcon: Story = {
  args: {
    "aria-label": "Search input",
    icon: <Icon glyph="Plus" size={16} />,
    label: "Search",
    placeholder: "Find tasks",
  },
};

export const WithPersistentPlaceholder: Story = {
  args: {
    "aria-label": "Version input",
    label: "Version",
    persistentPlaceholder: "evergreen-",
    placeholder: "main",
  },
};
