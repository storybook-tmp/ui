import type { Meta, StoryObj } from "@storybook/react-vite";
import PageSizeSelector from ".";

const meta = {
  title: "AI Generated/Medium/PageSizeSelector",
  component: PageSizeSelector,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof PageSizeSelector>;

export default meta;

type Story = StoryObj<typeof meta>;

const noop = () => undefined;

export const Default: Story = {
  args: {
    onChange: noop,
    value: 10,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    onChange: noop,
    value: 20,
  },
};
