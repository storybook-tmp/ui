import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { TreeSelect, type TreeSelectProps } from ".";

const meta = {
  title: "AI Generated/Complex/TreeSelect",
  component: TreeSelect,
  parameters: {
    layout: "centered",
  },
  render: (args) => <StatefulTreeSelect {...args} />,
} satisfies Meta<typeof TreeSelect>;

export default meta;

type Story = StoryObj<typeof meta>;

export const FlatOptions: Story = {
  args: {
    state: ["pass"],
    tData: getFlatTreeData(),
  },
};

export const NestedOptions: Story = {
  args: {
    state: ["failing-umbrella", "system-failure", "fail"],
    tData: getNestedTreeData(),
  },
};

function StatefulTreeSelect(args: TreeSelectProps) {
  const [state, setState] = useState(args.state);

  return <TreeSelect {...args} onChange={setState} state={state} />;
}

function getFlatTreeData() {
  return [
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
    {
      title: "Silent Fail",
      value: "silent fail",
      key: "silent fail",
    },
  ];
}

function getNestedTreeData() {
  return [
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
}
