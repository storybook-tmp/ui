import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Disclaimer } from "@leafygreen-ui/typography";
import { expect } from "storybook/test";
import PageSizeSelector from ".";

const meta = {
  args: {
    onChange: () => {},
    value: 10,
  },
  component: PageSizeSelector,
} satisfies Meta<typeof PageSizeSelector>;

export default meta;

type Story = StoryObj<typeof meta>;

const StatefulPageSizeSelector: React.FC<{
  disabled?: boolean;
  value: number;
}> = ({ disabled = false, value }) => {
  const [pageSize, setPageSize] = useState(value);

  return (
    <>
      <PageSizeSelector
        data-cy="page-size-selector"
        disabled={disabled}
        onChange={setPageSize}
        value={pageSize}
      />
      <Disclaimer>{`page-size:${pageSize}`}</Disclaimer>
    </>
  );
};

export const Default: Story = {
  render: () => <StatefulPageSizeSelector value={10} />,
  play: async ({ canvas, userEvent }) => {
    await expect(canvas.getByRole("button", { name: "10 / page" })).toBeVisible();
    await expect(canvas.getByText("page-size:10")).toBeVisible();

    await userEvent.click(canvas.getByRole("button", { name: "10 / page" }));
    await userEvent.click(canvas.getByText("20 / page"));

    await expect(canvas.getByText("page-size:20")).toBeVisible();
  },
};

export const Disabled: Story = {
  render: () => <StatefulPageSizeSelector disabled value={20} />,
  play: async ({ canvas }) => {
    const trigger = canvas.getByRole("button", { name: "20 / page" });

    await expect(trigger).toBeVisible();
    await expect(trigger).toHaveAttribute("aria-disabled", "true");
    await expect(canvas.getByText("page-size:20")).toBeVisible();
  },
};

export const LargeSelection: Story = {
  render: () => <StatefulPageSizeSelector value={50} />,
  play: async ({ canvas, userEvent }) => {
    await expect(canvas.getByRole("button", { name: "50 / page" })).toBeVisible();

    await userEvent.click(canvas.getByRole("button", { name: "50 / page" }));
    await userEvent.click(canvas.getByText("100 / page"));

    await expect(canvas.getByText("page-size:100")).toBeVisible();
  },
};
