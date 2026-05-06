import { useRef, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, waitFor } from "storybook/test";
import { Button } from "@leafygreen-ui/button";
import Popconfirm from ".";

const meta = {
  component: Popconfirm,
  tags: ["ai-generated"],
  args: {
    children: "Placeholder",
  },
} satisfies Meta<typeof Popconfirm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const triggerRef = useRef<HTMLButtonElement>(null);
    const [open, setOpen] = useState(false);
    return (
      <div style={{ padding: 80 }}>
        <Button ref={triggerRef} onClick={() => setOpen(true)}>
          Delete Item
        </Button>
        <Popconfirm
          open={open}
          setOpen={setOpen}
          refEl={triggerRef}
          onConfirm={() => setOpen(false)}
        >
          Are you sure you want to delete this item?
        </Popconfirm>
      </div>
    );
  },
  play: async ({ canvas, userEvent }) => {
    const trigger = canvas.getByRole("button", { name: /delete item/i });
    await expect(trigger).toBeVisible();
    await userEvent.click(trigger);
    await waitFor(() =>
      expect(
        canvas.getByText("Are you sure you want to delete this item?"),
      ).toBeVisible(),
    );
  },
};

export const WithCustomConfirmText: Story = {
  render: () => {
    const triggerRef = useRef<HTMLButtonElement>(null);
    const [open, setOpen] = useState(false);
    return (
      <div style={{ padding: 80 }}>
        <Button ref={triggerRef} onClick={() => setOpen(true)}>
          Restart Task
        </Button>
        <Popconfirm
          open={open}
          setOpen={setOpen}
          refEl={triggerRef}
          confirmText="Restart"
          onConfirm={() => setOpen(false)}
        >
          Are you sure you want to restart?
        </Popconfirm>
      </div>
    );
  },
  play: async ({ canvas, userEvent }) => {
    const trigger = canvas.getByRole("button", { name: /restart task/i });
    await userEvent.click(trigger);
    await waitFor(() =>
      expect(canvas.getByText("Are you sure you want to restart?")).toBeVisible(),
    );
    await expect(
      canvas.getByRole("button", { name: /^restart$/i }),
    ).toBeVisible();
  },
};

export const ConfirmDisabled: Story = {
  render: () => {
    const triggerRef = useRef<HTMLButtonElement>(null);
    const [open, setOpen] = useState(true);
    return (
      <div style={{ padding: 80 }}>
        <Button ref={triggerRef} onClick={() => setOpen(true)}>
          Trigger
        </Button>
        <Popconfirm
          open={open}
          setOpen={setOpen}
          refEl={triggerRef}
          confirmDisabled
          onConfirm={() => {}}
        >
          Confirm is disabled.
        </Popconfirm>
      </div>
    );
  },
  play: async ({ canvas }) => {
    await waitFor(() =>
      expect(canvas.getByText("Confirm is disabled.")).toBeVisible(),
    );
    await expect(canvas.getByRole("button", { name: /yes/i })).toHaveAttribute(
      "aria-disabled",
      "true",
    );
  },
};
