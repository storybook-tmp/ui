import type { Meta, StoryObj } from "@storybook/react-vite";
import Popconfirm from ".";

const meta = {
  title: "AI Generated/Complex/Popconfirm",
  component: Popconfirm,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Popconfirm>;

export default meta;

type Story = StoryObj<typeof meta>;

const noop = () => undefined;

export const Uncontrolled: Story = {
  args: {
    children: "This action cannot be undone.",
    onClose: noop,
    onConfirm: noop,
    trigger: <button type="button">Delete task</button>,
  },
};

export const OpenAndDisabled: Story = {
  args: {
    children: "This version is currently locked.",
    confirmDisabled: true,
    onClose: noop,
    onConfirm: noop,
    open: true,
    setOpen: noop,
  },
};
