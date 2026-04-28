import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "@leafygreen-ui/button";
import { useRef, useState } from "react";
import { expect, fn, waitFor } from "storybook/test";
import { within } from "storybook/test";
import Popconfirm from "./index";

const meta: Meta<typeof Popconfirm> = {
  component: Popconfirm,
  tags: ["ai-generated"],
};

export default meta;
type Story = StoryObj<typeof Popconfirm>;

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    const buttonRef = useRef<HTMLButtonElement>(null);
    return (
      <div style={{ padding: "100px" }}>
        <Button ref={buttonRef} onClick={() => setOpen(true)}>
          Delete Item
        </Button>
        <Popconfirm
          onConfirm={fn()}
          open={open}
          refEl={buttonRef as unknown as React.RefObject<HTMLElement>}
          setOpen={setOpen}
        >
          Are you sure you want to delete this item?
        </Popconfirm>
      </div>
    );
  },
  play: async ({ canvas, canvasElement, userEvent }) => {
    const trigger = canvas.getByRole("button", { name: /delete item/i });
    await expect(trigger).toBeVisible();
    await userEvent.click(trigger);
    // Popconfirm renders in a portal, query from document
    const body = within(canvasElement.ownerDocument.body);
    await waitFor(() => {
      expect(
        body.getByText("Are you sure you want to delete this item?"),
      ).toBeVisible();
    });
    await expect(body.getByRole("button", { name: /yes/i })).toBeVisible();
    await expect(
      body.getByRole("button", { name: /cancel/i }),
    ).toBeVisible();
  },
};

export const CustomConfirmText: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    const buttonRef = useRef<HTMLButtonElement>(null);
    return (
      <div style={{ padding: "100px" }}>
        <Button ref={buttonRef} onClick={() => setOpen(true)}>
          Restart Task
        </Button>
        <Popconfirm
          confirmText="Restart"
          onConfirm={fn()}
          open={open}
          refEl={buttonRef as unknown as React.RefObject<HTMLElement>}
          setOpen={setOpen}
        >
          Are you sure you want to restart this task?
        </Popconfirm>
      </div>
    );
  },
  play: async ({ canvas, canvasElement, userEvent }) => {
    const trigger = canvas.getByRole("button", { name: /restart task/i });
    await userEvent.click(trigger);
    const body = within(canvasElement.ownerDocument.body);
    await waitFor(() => {
      expect(body.getByRole("button", { name: /^restart$/i })).toBeVisible();
    });
  },
};

export const ConfirmDisabled: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    const buttonRef = useRef<HTMLButtonElement>(null);
    return (
      <div style={{ padding: "100px" }}>
        <Button ref={buttonRef} onClick={() => setOpen(true)}>
          Action
        </Button>
        <Popconfirm
          confirmDisabled
          onConfirm={fn()}
          open={open}
          refEl={buttonRef as unknown as React.RefObject<HTMLElement>}
          setOpen={setOpen}
        >
          This action requires additional permissions.
        </Popconfirm>
      </div>
    );
  },
  play: async ({ canvas, canvasElement, userEvent }) => {
    const trigger = canvas.getByRole("button", { name: /^action$/i });
    await userEvent.click(trigger);
    const body = within(canvasElement.ownerDocument.body);
    await waitFor(() => {
      expect(
        body.getByText("This action requires additional permissions."),
      ).toBeVisible();
    });
    const confirmButton = body.getByRole("button", { name: /yes/i });
    await expect(confirmButton).toHaveAttribute("aria-disabled", "true");
  },
};
