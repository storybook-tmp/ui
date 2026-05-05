import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, waitFor, within } from "storybook/test";
import { Button } from "@leafygreen-ui/button";
import Popconfirm from "./index";

const meta = {
  component: Popconfirm,
  tags: ["ai-generated"],
} satisfies Meta<typeof Popconfirm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Are you sure you want to proceed?",
    onConfirm: fn(),
    trigger: <Button>Open popconfirm</Button>,
  },
  play: async ({ canvas, canvasElement, userEvent }) => {
    const trigger = canvas.getByRole("button", { name: /open popconfirm/i });
    await expect(trigger).toBeVisible();
    await userEvent.click(trigger);
    const body = within(canvasElement.ownerDocument.body);
    await waitFor(() => {
      expect(
        body.getByText("Are you sure you want to proceed?"),
      ).toBeVisible();
    });
  },
};

export const CustomConfirmText: Story = {
  args: {
    children: "Delete this item?",
    confirmText: "Delete",
    onConfirm: fn(),
    trigger: <Button>Delete</Button>,
  },
  play: async ({ canvas, canvasElement, userEvent }) => {
    const trigger = canvas.getByRole("button", { name: /delete/i });
    await userEvent.click(trigger);
    const body = within(canvasElement.ownerDocument.body);
    await waitFor(() => {
      expect(body.getByText("Delete this item?")).toBeVisible();
    });
  },
};

export const ConfirmDisabled: Story = {
  args: {
    children: "This action is not available right now.",
    confirmDisabled: true,
    onConfirm: fn(),
    trigger: <Button>Confirm action</Button>,
  },
  play: async ({ canvas, canvasElement, userEvent }) => {
    await userEvent.click(
      canvas.getByRole("button", { name: /confirm action/i }),
    );
    const body = within(canvasElement.ownerDocument.body);
    await waitFor(() => {
      expect(
        body.getByText("This action is not available right now."),
      ).toBeVisible();
    });
  },
};
