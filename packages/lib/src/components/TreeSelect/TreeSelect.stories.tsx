import type { Meta, StoryObj } from "@storybook/react-vite";
import { TreeSelect, type TreeDataEntry } from ".";

const flatOptions: TreeDataEntry[] = [
  { key: "all", title: "All", value: "all" },
  { key: "pass", title: "Pass", value: "pass" },
  { key: "fail", title: "Fail", value: "fail" },
  { key: "skip", title: "Skip", value: "skip" },
];

const nestedOptions: TreeDataEntry[] = [
  { key: "all", title: "All", value: "all" },
  {
    key: "failure-umbrella",
    title: "Failure Umbrella",
    value: "failure-umbrella",
    children: [
      {
        key: "system-failure",
        title: "System Failure",
        value: "system-failure",
      },
      {
        key: "test-failure",
        title: "Test Failure",
        value: "test-failure",
      },
    ],
  },
  { key: "success", title: "Success", value: "success" },
];

const meta = {
  title: "AI Generated/Complex/TreeSelect",
  component: TreeSelect,
  args: {
    onChange: () => {},
    state: [],
    tData: flatOptions,
  },
} satisfies Meta<typeof TreeSelect>;

export default meta;

type Story = StoryObj<typeof meta>;

export const FlatOptions: Story = {};

export const NestedOptionsWithControls: Story = {
  args: {
    onFilter: () => {},
    onReset: () => {},
    state: ["failure-umbrella", "system-failure", "test-failure"],
    tData: nestedOptions,
  },
};
