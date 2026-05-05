import type { Meta, StoryObj } from "@storybook/react-vite";
import Popconfirm, { Align, Justify } from ".";

const meta = {
  title: "AI Generated/Complex/Popconfirm",
  component: Popconfirm,
  args: {
    align: Align.Top,
    children: <div>Are you sure you want to delete this task?</div>,
    justify: Justify.Middle,
    onClose: () => {},
    onConfirm: () => {},
    open: true,
    setOpen: () => {},
  },
} satisfies Meta<typeof Popconfirm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const OpenConfirmation: Story = {};

export const DisabledConfirm: Story = {
  args: {
    confirmDisabled: true,
    confirmText: "Cannot delete",
  },
};
