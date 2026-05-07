import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, waitFor, within } from "storybook/test";
import Popconfirm, { Align, Justify } from ".";

const meta = {
  component: Popconfirm,
  tags: ["ai-generated"],
  args: {
    onClose: fn(),
    onConfirm: fn(),
    setOpen: fn(),
  },
} satisfies Meta<typeof Popconfirm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Open: Story = {
  args: {
    align: Align.Bottom,
    justify: Justify.Middle,
    open: true,
    children: "Restart this task?",
  },
  play: async ({ canvasElement }) => {
    await waitFor(() => {
      expect(canvasElement.ownerDocument.body).toHaveTextContent(
        "Restart this task?",
      );
    });
    await expect(
      within(canvasElement.ownerDocument.body).getByRole("button", {
        name: "Cancel",
      }),
    ).toBeInTheDocument();
  },
};

export const ConfirmDisabled: Story = {
  args: {
    confirmDisabled: true,
    open: true,
    children: "This action is unavailable.",
  },
  play: async ({ canvasElement }) => {
    const confirmButton = within(canvasElement.ownerDocument.body).getByRole(
      "button",
      { name: "Yes" },
    );
    await expect(confirmButton).toHaveAttribute("aria-disabled", "true");
  },
};

export const ConfirmsAction: Story = {
  args: {
    confirmText: "Restart",
    open: true,
    children: "Restart this task?",
  },
  play: async ({ args, canvasElement, userEvent }) => {
    await userEvent.click(
      within(canvasElement.ownerDocument.body).getByRole("button", {
        name: "Restart",
      }),
    );
    await expect(args.onConfirm).toHaveBeenCalled();
    await expect(args.setOpen).toHaveBeenCalledWith(false);
  },
};
