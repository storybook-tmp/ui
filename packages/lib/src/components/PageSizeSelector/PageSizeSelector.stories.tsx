import type { Meta, StoryObj } from "@storybook/react-vite";
import PageSizeSelector from ".";

const meta = {
  title: "AI Generated/Medium/PageSizeSelector",
  component: PageSizeSelector,
  args: {
    onChange: () => {},
    value: 10,
  },
} satisfies Meta<typeof PageSizeSelector>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Disabled: Story = {
  args: {
    disabled: true,
    value: 20,
  },
};
