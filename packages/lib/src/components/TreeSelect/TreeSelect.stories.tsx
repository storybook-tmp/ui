import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { TreeSelect, type TreeDataEntry } from ".";

const flatTreeData: TreeDataEntry[] = [
  { title: "All", value: "all", key: "all" },
  { title: "Pass", value: "pass", key: "pass" },
  { title: "Fail", value: "fail", key: "fail" },
  { title: "Skip", value: "skip", key: "skip" },
];

const nestedTreeData: TreeDataEntry[] = [
  { title: "All", value: "all", key: "all" },
  {
    title: "Failing umbrella",
    value: "failing-umbrella",
    key: "failing-umbrella",
    children: [
      {
        title: "System failure",
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
  { title: "Pass", value: "pass", key: "pass" },
];

const meta = {
  title: "AI Generated/Complex/TreeSelect",
  component: TreeSelect,
  args: {
    onChange: fn(),
    state: [],
    tData: flatTreeData,
  },
} satisfies Meta<typeof TreeSelect>;

export default meta;

type Story = StoryObj<typeof meta>;

export const FlatOptions: Story = {};

export const NestedWithActions: Story = {
  args: {
    onFilter: fn(),
    onReset: fn(),
    tData: nestedTreeData,
  },
  render: (args) => {
    const [state, setState] = useState<string[]>([]);

    return <TreeSelect {...args} onChange={setState} state={state} />;
  },
};
