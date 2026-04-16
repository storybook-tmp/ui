import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, waitFor, within } from "storybook/test";
import PageSizeSelector from ".";

const meta = {
  args: {
    onChange: () => {},
    value: 10,
  },
  component: PageSizeSelector,
  title: "Components/PageSizeSelector",
} satisfies Meta<typeof PageSizeSelector>;

export default meta;

type Story = StoryObj<typeof meta>;

const StatefulPageSizeSelector: React.FC<{
  disabled?: boolean;
  initialValue?: number;
}> = ({ disabled = false, initialValue = 10 }) => {
  const [value, setValue] = useState(initialValue);

  return (
    <PageSizeSelector
      disabled={disabled}
      onChange={(nextValue) => setValue(nextValue)}
      value={value}
    />
  );
};

export const Default: Story = {
  play: async ({ mount }) => {
    const canvas = await mount(
      <PageSizeSelector onChange={() => {}} value={10} />,
    );
    const button = await canvas.findByRole("button", { name: "10 / page" });

    await expect(button).toBeVisible();
    await expect(button).toHaveTextContent("10 / page");
  },
};

export const ChangeSelection: Story = {
  play: async ({ canvasElement, mount, userEvent }) => {
    const canvas = await mount(<StatefulPageSizeSelector />);
    const button = await canvas.findByRole("button", { name: "10 / page" });
    const documentBody = canvasElement.ownerDocument.body;

    await userEvent.click(button);
    const option = await within(documentBody).findByRole("option", {
      name: "20 / page",
    });

    await userEvent.click(option);

    await waitFor(async () => {
      await expect(
        await canvas.findByRole("button", { name: "20 / page" }),
      ).toBeVisible();
    });
  },
};

export const Disabled: Story = {
  play: async ({ mount }) => {
    const canvas = await mount(<StatefulPageSizeSelector disabled />);
    const button = await canvas.findByRole("button", { name: "10 / page" });

    await expect(button).toHaveAttribute("aria-disabled", "true");
  },
};
