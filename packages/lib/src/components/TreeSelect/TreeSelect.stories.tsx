import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, waitFor } from "storybook/test";
import { TreeSelect, TreeDataEntry } from ".";

const meta = {
  component: TreeSelect,
  tags: ["ai-generated"],
} satisfies Meta<typeof TreeSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

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

const TreeSelectExample = ({
  initialState = [],
  showControls = false,
  tData,
}: {
  initialState?: string[];
  showControls?: boolean;
  tData: TreeDataEntry[];
}) => {
  const [state, setState] = useState(initialState);
  return (
    <TreeSelect
      onChange={setState}
      onFilter={showControls ? () => undefined : undefined}
      onReset={showControls ? () => setState([]) : undefined}
      state={state}
      tData={tData}
    />
  );
};

export const FlatOptions: Story = {
  args: {
    onChange: () => undefined,
    state: [],
    tData: flatTreeData,
  },
  render: () => <TreeSelectExample tData={flatTreeData} />,
  play: async ({ canvas }) => {
    await expect(canvas.getByText("All")).toBeVisible();
    await expect(canvas.getByText("Pass")).toBeVisible();
    await expect(canvas.getByText("Silent Fail")).toBeVisible();
  },
};

export const SelectedOption: Story = {
  args: {
    onChange: () => undefined,
    state: ["pass"],
    tData: flatTreeData,
  },
  render: () => (
    <TreeSelectExample initialState={["pass"]} tData={flatTreeData} />
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByLabelText("Pass")).toBeChecked();
  },
};

export const NestedWithControls: Story = {
  args: {
    onChange: () => undefined,
    state: [],
    tData: nestedTreeData,
  },
  render: () => <TreeSelectExample showControls tData={nestedTreeData} />,
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByText("Failing Umbrella"));

    await waitFor(() => {
      expect(canvas.getByLabelText("System Failure")).toBeChecked();
    });
    await expect(canvas.getByLabelText("Fail")).toBeChecked();

    await userEvent.click(canvas.getByRole("button", { name: "Reset" }));
    await waitFor(() => {
      expect(canvas.getByLabelText("System Failure")).not.toBeChecked();
    });
  },
};
