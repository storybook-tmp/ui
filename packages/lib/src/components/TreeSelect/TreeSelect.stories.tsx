import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn } from "storybook/test";
import { TreeSelect } from "./TreeSelect";
import type { TreeDataEntry } from "./TreeSelect";

const sampleData: TreeDataEntry[] = [
  {
    title: "All",
    value: "all",
    key: "all",
  },
  {
    title: "Fruits",
    value: "fruits",
    key: "fruits",
    children: [
      { title: "Apple", value: "apple", key: "apple" },
      { title: "Banana", value: "banana", key: "banana" },
    ],
  },
  {
    title: "Vegetables",
    value: "vegetables",
    key: "vegetables",
    children: [
      { title: "Carrot", value: "carrot", key: "carrot" },
      { title: "Broccoli", value: "broccoli", key: "broccoli" },
    ],
  },
];

const meta = {
  component: TreeSelect,
  tags: ["ai-generated"],
  args: {
    state: [],
    tData: sampleData,
    onChange: fn(),
  },
} satisfies Meta<typeof TreeSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

const TreeSelectWithState = ({
  initialState = [] as string[],
  ...props
}: Omit<React.ComponentProps<typeof TreeSelect>, "state" | "onChange"> & {
  initialState?: string[];
}) => {
  const [state, setState] = useState<string[]>(initialState);
  return <TreeSelect state={state} onChange={setState} {...props} />;
};

export const NoneSelected: Story = {
  render: (args) => <TreeSelectWithState tData={args.tData} />,
  play: async ({ canvas }) => {
    const checkboxes = canvas.getAllByRole("checkbox");
    await expect(checkboxes.length).toBeGreaterThanOrEqual(5);
  },
};

export const AllSelected: Story = {
  render: (args) => (
    <TreeSelectWithState
      tData={args.tData}
      initialState={[
        "all",
        "fruits",
        "apple",
        "banana",
        "vegetables",
        "carrot",
        "broccoli",
      ]}
    />
  ),
  play: async ({ canvas }) => {
    const allCheckbox = canvas.getAllByRole("checkbox")[0];
    await expect(allCheckbox).toBeChecked();
  },
};

export const ToggleSelection: Story = {
  render: (args) => <TreeSelectWithState tData={args.tData} />,
  play: async ({ canvas, userEvent }) => {
    const appleLabel = canvas.getByText("Apple");
    await userEvent.click(appleLabel);
    const appleCheckbox = canvas.getByLabelText("Apple");
    await expect(appleCheckbox).toBeChecked();
  },
};

export const WithFilterControls: Story = {
  render: (args) => (
    <TreeSelectWithState
      tData={args.tData}
      initialState={["apple"]}
      onReset={fn()}
      onFilter={fn()}
    />
  ),
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole("button", { name: /filter/i }),
    ).toBeVisible();
  },
};
