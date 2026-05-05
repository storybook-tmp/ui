import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import Popconfirm from ".";

const meta = {
  title: "AI Generated/Complex/Popconfirm",
  component: Popconfirm,
} satisfies Meta<typeof Popconfirm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Are you sure you want to delete this item?",
    onConfirm: fn(),
    trigger: <button>Delete</button>,
  },
};

export const CustomConfirmText: Story = {
  args: {
    children: "This action cannot be undone. Proceed?",
    confirmText: "Confirm",
    onConfirm: fn(),
    trigger: <button>Remove</button>,
  },
};
