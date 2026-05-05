import type { Meta, StoryObj } from "@storybook/react-vite";
import { TestStatus } from "../../../types/test";
import TestStatusBadge from ".";

const meta = {
  title: "AI Generated/Simple/TestStatusBadge",
  component: TestStatusBadge,
} satisfies Meta<typeof TestStatusBadge>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Passing: Story = {
  args: {
    status: TestStatus.Pass,
  },
};

export const SilentFailure: Story = {
  args: {
    status: TestStatus.SilentFail,
  },
};
