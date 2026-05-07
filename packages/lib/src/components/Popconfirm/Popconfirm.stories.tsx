import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "@leafygreen-ui/button";
import { expect, fn, waitFor, within } from "storybook/test";
import Popconfirm from ".";

const meta = {
  component: Popconfirm,
  tags: ["ai-generated"],
  args: {
    children: "This task will be aborted.",
    onConfirm: fn(),
    setOpen: fn(),
  },
} satisfies Meta<typeof Popconfirm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Open: Story = {
  args: {
    confirmText: "Abort task",
    open: true,
  },
  play: async ({ args, canvasElement, userEvent }) => {
    const body = within(canvasElement.ownerDocument.body);
    await waitFor(() => {
      expect(body.getByText("This task will be aborted.")).toBeVisible();
    });
    await userEvent.click(body.getByRole("button", { name: "Abort task" }));
    await expect(args.onConfirm).toHaveBeenCalled();
  },
};

export const DisabledConfirm: Story = {
  args: {
    confirmDisabled: true,
    open: true,
  },
};

export const WithTrigger: Story = {
  args: {
    trigger: (
      <Button size="small" type="button">
        Open confirmation
      </Button>
    ),
  },
};
