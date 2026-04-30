import type { Meta, StoryObj } from "@storybook/react-vite";
import TestStatusBadge from ".";

const meta = {
  title: "AI Generated/Simple/TestStatusBadge",
  component: TestStatusBadge,
} satisfies Meta<typeof TestStatusBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Pass: Story = {
  args: {
    status: "pass",
  },
};

export const Fail: Story = {
  args: {
    status: "fail",
  },
};

export const Skip: Story = {
  args: {
    status: "skip",
  },
};

export const SilentFail: Story = {
  args: {
    status: "silentfail",
  },
};
