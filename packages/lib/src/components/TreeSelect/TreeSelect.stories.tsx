import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn } from "storybook/test";
import { TreeSelect } from ".";

const treeData = [
  {
    title: "All",
    value: "all",
    key: "all",
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
    state: [],
    tData: treeData,
  },
} satisfies Meta<typeof TreeSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const EmptySelection: Story = {
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.click(canvas.getByText("Pass"));
    await expect(args.onChange).toHaveBeenCalledWith(["pass"]);
  },
};

export const ParentSelected: Story = {
  args: {
    state: ["failing-umbrella", "system-failure", "fail"],
  },
};

export const WithControls: Story = {
  args: {
    onFilter: fn(),
    onReset: fn(),
    state: ["pass"],
  },
};
