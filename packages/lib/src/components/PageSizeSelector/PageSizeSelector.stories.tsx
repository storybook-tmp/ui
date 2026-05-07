import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, waitFor, within } from "storybook/test";
import PageSizeSelector from ".";

const meta = {
  component: PageSizeSelector,
  tags: ["ai-generated"],
} satisfies Meta<typeof PageSizeSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onChange: () => undefined,
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
    onChange: () => undefined,
    value: 20,
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole("button", { name: "20 / page" }),
    ).toHaveAttribute("aria-disabled", "true");
  },
};

const PageSizeSelectorExample = () => {
  const [pageSize, setPageSize] = useState(10);
  return <PageSizeSelector onChange={setPageSize} value={pageSize} />;
};

export const SelectingPageSize: Story = {
  args: {
    onChange: () => undefined,
    value: 10,
  },
  render: () => <PageSizeSelectorExample />,
  play: async ({ canvas, canvasElement, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: "10 / page" }));

    const page = within(canvasElement.ownerDocument.body);
    await waitFor(() => {
      expect(page.getByText("20 / page")).toBeVisible();
    });
    await userEvent.click(page.getByText("20 / page"));

    await waitFor(() => {
      expect(canvas.getByRole("button", { name: "20 / page" })).toBeVisible();
    });
  },
};
