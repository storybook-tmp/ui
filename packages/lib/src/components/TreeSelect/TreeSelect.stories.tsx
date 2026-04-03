import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { TreeSelect, ALL_VALUE, type TreeDataEntry } from "./TreeSelect";

const meta = {
  component: TreeSelect,
  args: {
    tData: [],
    state: [],
    onChange: () => {},
  },
} satisfies Meta<typeof TreeSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

const statusData: TreeDataEntry[] = [
  { title: "All", value: ALL_VALUE, key: "all" },
  {
    title: "Failed",
    value: "failed",
    key: "failed",
    children: [
      { title: "Test Timed Out", value: "test-timed-out", key: "test-timed-out" },
      { title: "Task Timed Out", value: "task-timed-out", key: "task-timed-out" },
    ],
  },
  {
    title: "System Issues",
    value: "system",
    key: "system",
    children: [
      { title: "System Failed", value: "system-failed", key: "system-failed" },
      { title: "Setup Failed", value: "setup-failed", key: "setup-failed" },
    ],
  },
  { title: "Succeeded", value: "succeeded", key: "succeeded" },
];

const TreeSelectWrapper = ({
  tData,
  initialState = [],
  onReset,
  onFilter,
}: {
  tData: TreeDataEntry[];
  initialState?: string[];
  onReset?: () => void;
  onFilter?: () => void;
}) => {
  const [state, setState] = useState<string[]>(initialState);
  return (
    <TreeSelect
      tData={tData}
      state={state}
      onChange={setState}
      onReset={onReset}
      onFilter={onFilter}
    />
  );
};

export const Default: Story = {
  render: () => <TreeSelectWrapper tData={statusData} />,
};

export const WithPreselectedValues: Story = {
  render: () => (
    <TreeSelectWrapper
      tData={statusData}
      initialState={["succeeded", "failed", "test-timed-out", "task-timed-out"]}
    />
  ),
};

export const WithFilterControls: Story = {
  render: () => (
    <TreeSelectWrapper
      tData={statusData}
      onReset={() => {}}
      onFilter={() => {}}
    />
  ),
};
