import type { Meta, StoryObj } from "@storybook/react-vite";
import { TestStatus } from "../../../types/test";
import TestStatusBadge from ".";

const meta = {
  title: "AI Generated/Simple/TestStatusBadge",
  component: TestStatusBadge,
  args: {
    status: TestStatus.Pass,
  },
} satisfies Meta<typeof TestStatusBadge>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Passing: Story = {};

export const SilentFailure: Story = {
  args: {
    status: TestStatus.SilentFail,
  },
};
