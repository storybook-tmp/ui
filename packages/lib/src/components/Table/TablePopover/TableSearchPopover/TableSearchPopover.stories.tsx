import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, waitFor, within } from "storybook/test";
import TableSearchPopover from ".";

const meta = {
  component: TableSearchPopover,
  tags: ["ai-generated"],
  args: {
    "data-cy": "storybook-search-popover",
    onConfirm: fn(),
    placeholder: "Search tasks",
    value: "",
  },
} satisfies Meta<typeof TableSearchPopover>;

export default meta;
type Story = StoryObj<typeof meta>;

export const EmptySearch: Story = {
  play: async ({ args, canvas, canvasElement, userEvent }) => {
    await userEvent.click(
      canvas.getByRole("button", { name: "Table Search Popover Icon" }),
    );
    const body = within(canvasElement.ownerDocument.body);
    await waitFor(() => {
      expect(body.getByPlaceholderText("Search tasks")).toHaveFocus();
    });
    await userEvent.type(body.getByPlaceholderText("Search tasks"), "linux");
    await userEvent.keyboard("{Enter}");
    await expect(args.onConfirm).toHaveBeenCalledWith("linux");
  },
};

export const WithValue: Story = {
  args: {
    value: "ubuntu",
  },
};

export const CustomPlaceholder: Story = {
  args: {
    placeholder: "Search variant",
  },
};
