import { useRef, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "@leafygreen-ui/button";
import { expect, fn } from "storybook/test";
import Popconfirm from "./index";

const meta = {
  component: Popconfirm,
  tags: ["ai-generated"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Popconfirm>;

export default meta;
type Story = StoryObj<typeof meta>;

const PopconfirmDemo = ({
  confirmText,
  confirmDisabled,
  triggerLabel = "Delete Item",
  message = "Are you sure you want to delete this item?",
}: {
  confirmText?: string;
  confirmDisabled?: boolean;
  triggerLabel?: string;
  message?: string;
}) => {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  return (
    <>
      <Button ref={buttonRef} onClick={() => setOpen(true)}>
        {triggerLabel}
      </Button>
      <Popconfirm
          open={open}
          setOpen={setOpen}
          refEl={buttonRef as React.RefObject<HTMLElement>}
          confirmText={confirmText}
          confirmDisabled={confirmDisabled}
          onConfirm={fn()}
        >
          {message}
        </Popconfirm>
    </>
  );
};

export const Default: Story = {
  args: {
    children: "Are you sure you want to delete this item?",
  },
  render: () => <PopconfirmDemo />,
  play: async ({ canvas }) => {
    const trigger = canvas.getByRole("button", { name: /delete item/i });
    await expect(trigger).toBeVisible();
  },
};

export const CustomConfirmText: Story = {
  args: {
    children: "This action cannot be undone.",
    confirmText: "Confirm",
  },
  render: () => (
    <PopconfirmDemo
      confirmText="Confirm"
      triggerLabel="Remove"
      message="This action cannot be undone."
    />
  ),
  play: async ({ canvas }) => {
    const trigger = canvas.getByRole("button", { name: /remove/i });
    await expect(trigger).toBeVisible();
  },
};

export const ConfirmDisabled: Story = {
  args: {
    children: "Confirm button is disabled.",
    confirmDisabled: true,
  },
  render: () => (
    <PopconfirmDemo
      confirmDisabled
      triggerLabel="Action"
      message="Confirm button is disabled."
    />
  ),
  play: async ({ canvas }) => {
    const trigger = canvas.getByRole("button", { name: /action/i });
    await expect(trigger).toBeVisible();
  },
};
