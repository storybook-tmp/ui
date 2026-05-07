import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, waitFor, within } from "storybook/test";
import PageSizeSelector from ".";

const meta = {
  component: PageSizeSelector,
  tags: ["ai-generated"],
  args: {
    onChange: fn(),
  },
} satisfies Meta<typeof PageSizeSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TenPerPage: Story = {
  args: {
    value: 10,
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole("button", { name: "10 / page" }),
    ).toBeVisible();
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    value: 20,
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole("button", { name: "20 / page" }),
    ).toHaveAttribute("aria-disabled", "true");
  },
};

export const SelectsNewPageSize: Story = {
  args: {
    value: 10,
  },
  play: async ({ args, canvas, canvasElement, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: "10 / page" }));
    await waitFor(() => {
      expect(canvasElement.ownerDocument.body).toHaveTextContent("20 / page");
    });
    await userEvent.click(
      within(canvasElement.ownerDocument.body).getByText("20 / page"),
    );
    await expect(args.onChange).toHaveBeenCalledWith(20);
  },
};
