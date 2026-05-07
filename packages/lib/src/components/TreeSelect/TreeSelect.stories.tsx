import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn } from "storybook/test";
import { ALL_VALUE, TreeSelect, TreeDataEntry } from ".";

const testStatusOptions: TreeDataEntry[] = [
  {
    title: "All",
    value: ALL_VALUE,
    key: ALL_VALUE,
  },
  {
    title: "Failing Umbrella",
    value: "failing-umbrella",
    key: "failing-umbrella",
    children: [
      {
        title: "System Failure",
        value: "system-failure",
        key: "system-failure",
      },
      {
        title: "Fail",
        value: "fail",
        key: "fail",
      },
    ],
  },
  {
    title: "Pass",
    value: "pass",
    key: "pass",
  },
];

const meta = {
  component: TreeSelect,
  tags: ["ai-generated"],
  args: {
    onChange: fn(),
    tData: testStatusOptions,
  },
} satisfies Meta<typeof TreeSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const EmptySelection: Story = {
  args: {
    state: [],
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText("All")).toBeVisible();
    await expect(canvas.getByText("Failing Umbrella")).toBeVisible();
  },
};

export const SelectedChild: Story = {
  args: {
    state: ["fail"],
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByLabelText("Fail")).toBeChecked();
    await expect(canvas.getByLabelText("Pass")).not.toBeChecked();
  },
};

export const SelectsParentAndChildren: Story = {
  args: {
    state: [],
  },
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.click(canvas.getByText("Failing Umbrella"));
    await expect(args.onChange).toHaveBeenCalledWith([
      "failing-umbrella",
      "system-failure",
      "fail",
    ]);
  },
};
