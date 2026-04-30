import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import Popconfirm from ".";

const meta = {
  title: "AI Generated/Complex/Popconfirm",
  component: Popconfirm,
  args: {
    children: "Are you sure you want to remove this task from the patch?",
    onClose: fn(),
    onConfirm: fn(),
  },
} satisfies Meta<typeof Popconfirm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Open: Story = {
  args: {
    open: true,
    setOpen: fn(),
  },
};

export const Triggered: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false);

    return (
      <Popconfirm
        {...args}
        open={open}
        setOpen={setOpen}
        trigger={<button type="button">Open confirmation</button>}
      />
    );
  },
};
