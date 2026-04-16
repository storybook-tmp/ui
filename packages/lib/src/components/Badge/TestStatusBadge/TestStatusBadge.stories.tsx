import type { Meta, StoryObj } from "@storybook/react-vite";
import TestStatusBadge from ".";

const meta = {
  component: TestStatusBadge,
} satisfies Meta<typeof TestStatusBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Pass: Story = {
  render: () => <TestStatusBadge status="pass" />,
};

export const Fail: Story = {
  render: () => <TestStatusBadge status="fail" />,
};

export const Skip: Story = {
  render: () => <TestStatusBadge status="skip" />,
};

export const SilentFail: Story = {
  render: () => <TestStatusBadge status="silentfail" />,
};

export const AllStatuses: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 8 }}>
      <TestStatusBadge status="pass" />
      <TestStatusBadge status="fail" />
      <TestStatusBadge status="skip" />
      <TestStatusBadge status="silentfail" />
    </div>
  ),
};
