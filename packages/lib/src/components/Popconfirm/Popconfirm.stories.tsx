import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, waitFor, within } from "storybook/test";
import Popconfirm from ".";

const meta = {
  component: Popconfirm,
  args: {
    children: "Archive generated tasks?",
  },
} satisfies Meta<typeof Popconfirm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ClosedTrigger: Story = {
  args: {
    trigger: (
      <span role="button" tabIndex={0}>
        Archive
      </span>
    ),
  },
  play: async ({ canvas, canvasElement }) => {
    const body = within(canvasElement.ownerDocument.body);

    await expect(canvas.getByText("Archive")).toBeVisible();
    await expect(body.queryByText("Archive generated tasks?")).toBeNull();
  },
};

export const ConfirmAction: Story = {
  args: {
    onConfirm: fn(),
  },
  render: (args) => (
    <Popconfirm
      {...args}
      trigger={
        <span role="button" tabIndex={0}>
          Archive
        </span>
      }
    />
  ),
  play: async ({ args, canvas, canvasElement, userEvent }) => {
    const body = within(canvasElement.ownerDocument.body);

    await userEvent.click(canvas.getByText("Archive"));
    await waitFor(() => {
      expect(body.getByText("Archive generated tasks?")).toBeVisible();
    });

    await userEvent.click(body.getByRole("button", { name: "Yes" }));
    await expect(args.onConfirm).toHaveBeenCalledTimes(1);
  },
};

export const DisabledConfirm: Story = {
  args: {
    confirmDisabled: true,
  },
  render: (args) => (
    <Popconfirm
      {...args}
      trigger={
        <span role="button" tabIndex={0}>
          Archive
        </span>
      }
    />
  ),
  play: async ({ canvas, canvasElement, userEvent }) => {
    const body = within(canvasElement.ownerDocument.body);

    await userEvent.click(canvas.getByText("Archive"));
    await waitFor(() => {
      expect(body.getByText("Archive generated tasks?")).toBeVisible();
    });
    await expect(body.getByRole("button", { name: "Yes" })).toHaveAttribute(
      "aria-disabled",
      "true",
    );
  },
};
