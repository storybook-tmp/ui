import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Disclaimer } from "@leafygreen-ui/typography";
import { expect } from "storybook/test";
import { TreeSelect, type TreeDataEntry } from ".";

const flatTreeData: TreeDataEntry[] = [
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

const nestedTreeData: TreeDataEntry[] = [
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
  args: {
    onChange: () => {},
    state: [],
    tData: flatTreeData,
  },
  component: TreeSelect,
} satisfies Meta<typeof TreeSelect>;

export default meta;

type Story = StoryObj<typeof meta>;

const StatefulTreeSelect: React.FC<{
  initialState?: string[];
  tData: TreeDataEntry[];
}> = ({ initialState = [], tData }) => {
  const [selectedValues, setSelectedValues] = useState(initialState);

  return (
    <>
      <TreeSelect onChange={setSelectedValues} state={selectedValues} tData={tData} />
      <Disclaimer>{selectedValues.join("|") || "empty"}</Disclaimer>
    </>
  );
};

export const Default: Story = {
  render: () => <StatefulTreeSelect tData={flatTreeData} />,
  play: async ({ canvas, userEvent }) => {
    await expect(canvas.getByText("Pass")).toBeVisible();
    await expect(canvas.getByText("empty")).toBeVisible();

    await userEvent.click(canvas.getByText("Pass"));

    await expect(canvas.getByText("pass")).toBeVisible();
  },
};

export const SelectAll: Story = {
  render: () => <StatefulTreeSelect tData={flatTreeData} />,
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByText("All"));

    await expect(
      canvas.getByText("all|pass|fail|skip|silent fail"),
    ).toBeVisible();
  },
};

export const NestedSelection: Story = {
  render: () => <StatefulTreeSelect tData={nestedTreeData} />,
  play: async ({ canvas, userEvent }) => {
    await expect(canvas.getByText("Failing Umbrella")).toBeVisible();

    await userEvent.click(canvas.getByText("Failing Umbrella"));

    await expect(
      canvas.getByText("failing-umbrella|system-failure|fail"),
    ).toBeVisible();
  },
};
