import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import PageSizeSelector from ".";

const meta = {
  title: "AI Generated/Medium/PageSizeSelector",
  component: PageSizeSelector,
} satisfies Meta<typeof PageSizeSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 10,
    onChange: fn(),
  },
};

export const Disabled: Story = {
  args: {
    value: 20,
    onChange: fn(),
    disabled: true,
  },
};
