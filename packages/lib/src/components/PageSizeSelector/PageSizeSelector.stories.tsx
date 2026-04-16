import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn, expect, waitFor } from "storybook/test";
import PageSizeSelector from ".";

const meta = {
  component: PageSizeSelector,
} satisfies Meta<typeof PageSizeSelector>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onChange: fn(),
    value: 10,
  },
  play: async ({ args, canvas, userEvent }) => {
    await expect(canvas.getByRole("button", { name: "10 / page" })).toBeVisible();
    await userEvent.click(canvas.getByRole("button", { name: "10 / page" }));
    await waitFor(() => {
      expect(canvas.getByText("20 / page")).toBeVisible();
    });
    await userEvent.click(canvas.getByText("20 / page"));
    await expect(args.onChange).toHaveBeenCalledWith(20);
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    onChange: fn(),
    value: 10,
  },
  play: async ({ args, canvas, userEvent }) => {
    const trigger = canvas.getByRole("button", { name: "10 / page" });
    await expect(trigger).toHaveAttribute("aria-disabled", "true");
    await userEvent.click(trigger);
    await expect(args.onChange).not.toHaveBeenCalled();
  },
};

export const LargerPageSize: Story = {
  args: {
    onChange: fn(),
    value: 50,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("button", { name: "50 / page" })).toBeVisible();
  },
};
