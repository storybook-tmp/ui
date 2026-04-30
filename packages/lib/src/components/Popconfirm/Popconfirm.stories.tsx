import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn } from "storybook/test";
import { Button } from "@leafygreen-ui/button";
import Popconfirm from "./index";

const meta = {
  component: Popconfirm,
  tags: ["ai-generated"],
  args: {
    children: "Are you sure?",
    onConfirm: fn(),
  },
} satisfies Meta<typeof Popconfirm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Are you sure you want to proceed?",
    open: true,
    setOpen: () => {},
  },
  play: async ({ canvasElement }) => {
    const doc = canvasElement.ownerDocument;
    const cancelBtn = [...doc.querySelectorAll("button")].find(
      (btn) => btn.textContent === "Cancel",
    );
    await expect(cancelBtn).toBeTruthy();
  },
};

export const OpenedViaClick: Story = {
  render: (args) => (
    <Popconfirm
      {...args}
      trigger={<Button>Delete Item</Button>}
    >
      Are you sure you want to delete this?
    </Popconfirm>
  ),
  play: async ({ canvas, userEvent }) => {
    const trigger = canvas.getByRole("button", { name: /delete item/i });
    await expect(trigger).toBeVisible();
    await userEvent.click(trigger);
  },
};

export const CustomConfirmText: Story = {
  args: {
    children: "This action cannot be undone.",
    confirmText: "Delete",
    open: true,
    setOpen: () => {},
  },
  play: async ({ canvasElement }) => {
    const doc = canvasElement.ownerDocument;
    const deleteBtn = [...doc.querySelectorAll("button")].find(
      (btn) => btn.textContent === "Delete",
    );
    await expect(deleteBtn).toBeTruthy();
  },
};
