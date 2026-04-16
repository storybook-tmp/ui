import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn, expect } from "storybook/test";
import { TreeSelect } from ".";

const treeData = [
  {
    title: "All",
    value: "all",
    key: "all",
  },
  {
    title: "Pass",
    value: "pass",
    key: "pass",
  },
  {
    title: "Fail",
    value: "fail",
    key: "fail",
  },
  {
    title: "Skip",
    value: "skip",
    key: "skip",
  },
];

const nestedTreeData = [
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
} satisfies Meta<typeof TreeSelect>;

export default meta;

type Story = StoryObj<typeof meta>;

export const FlatOptions: Story = {
  args: {
    onChange: fn(),
    state: [],
    tData: treeData,
  },
  play: async ({ args, canvas, userEvent }) => {
    await expect(canvas.getByText("Pass")).toBeVisible();
    await userEvent.click(canvas.getByText("Pass"));
    await expect(args.onChange).toHaveBeenCalledWith(["pass"]);
  },
};

export const Preselected: Story = {
  args: {
    onChange: fn(),
    state: ["pass"],
    tData: treeData,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByLabelText("Pass")).toBeChecked();
  },
};

export const NestedSelection: Story = {
  args: {
    onChange: fn(),
    state: [],
    tData: nestedTreeData,
  },
  play: async ({ args, canvas, userEvent }) => {
    await expect(canvas.getByText("Failing Umbrella")).toBeVisible();
    await userEvent.click(canvas.getByText("Failing Umbrella"));
    await expect(args.onChange).toHaveBeenCalledWith([
      "failing-umbrella",
      "system-failure",
      "fail",
    ]);
  },
};
