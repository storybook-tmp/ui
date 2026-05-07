import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, waitFor, within } from "storybook/test";
import PageSizeSelector from ".";

const meta = {
  component: PageSizeSelector,
  tags: ["ai-generated"],
  args: {
    onChange: fn(),
    value: 10,
  },
} satisfies Meta<typeof PageSizeSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TenPerPage: Story = {
  play: async ({ args, canvas, canvasElement, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: "10 / page" }));
    const body = within(canvasElement.ownerDocument.body);
    await waitFor(() => {
      expect(body.getByText("20 / page")).toBeVisible();
    });
    await userEvent.click(body.getByText("20 / page"));
    await expect(args.onChange).toHaveBeenCalledWith(20);
  },
};

export const FiftyPerPage: Story = {
  args: {
    value: 50,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    value: 20,
  },
};
