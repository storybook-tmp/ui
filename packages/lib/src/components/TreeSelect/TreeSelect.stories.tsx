import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { TreeSelect, TreeDataEntry } from ".";

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
  title: "Components/TreeSelect",
} satisfies Meta<typeof TreeSelect>;

export default meta;

type Story = StoryObj<typeof meta>;

const StatefulTreeSelect: React.FC<{
  onFilter?: () => void;
  onReset?: () => void;
  state?: string[];
  tData: TreeDataEntry[];
}> = ({ onFilter, onReset, state = [], tData }) => {
  const [value, setValue] = useState(state);

  return (
    <TreeSelect
      onChange={(nextValue) => setValue(nextValue)}
      onFilter={onFilter}
      onReset={onReset}
      state={value}
      tData={tData}
    />
  );
};

export const FlatOptions: Story = {
  play: async ({ mount }) => {
    const canvas = await mount(
      <TreeSelect onChange={() => {}} state={[]} tData={flatTreeData} />,
    );

    await expect(await canvas.findByText("All")).toBeVisible();
    await expect(await canvas.findByLabelText("Pass")).not.toBeChecked();
    await expect(await canvas.findByLabelText("Fail")).not.toBeChecked();
  },
};

export const NestedSelection: Story = {
  play: async ({ mount, userEvent }) => {
    const canvas = await mount(<StatefulTreeSelect tData={nestedTreeData} />);
    const parentLabel = await canvas.findByText("Failing Umbrella");

    await userEvent.click(parentLabel);

    await expect(await canvas.findByLabelText("Failing Umbrella")).toBeChecked();
    await expect(await canvas.findByLabelText("System Failure")).toBeChecked();
    await expect(await canvas.findByLabelText("Fail")).toBeChecked();
  },
};

export const FilterControls: Story = {
  play: async ({ mount, userEvent }) => {
    let filterClicks = 0;
    let resetClicks = 0;
    const canvas = await mount(
      <StatefulTreeSelect
        onFilter={() => {
          filterClicks += 1;
        }}
        onReset={() => {
          resetClicks += 1;
        }}
        state={["pass"]}
        tData={flatTreeData}
      />,
    );

    await expect(await canvas.findByLabelText("Pass")).toBeChecked();
    await userEvent.click(await canvas.findByRole("button", { name: "Filter" }));
    await userEvent.click(await canvas.findByRole("button", { name: "Reset" }));

    await expect(filterClicks).toBe(1);
    await expect(resetClicks).toBe(1);
  },
};
