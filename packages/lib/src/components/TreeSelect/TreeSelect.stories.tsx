import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
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
      { title: "Cherry", value: "cherry", key: "cherry" },
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
  title: "AI Generated/Complex/TreeSelect",
  component: TreeSelect,
} satisfies Meta<typeof TreeSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    tData: sampleData,
    state: [],
    onChange: fn(),
  },
};

export const WithSelections: Story = {
  args: {
    tData: sampleData,
    state: ["fruits", "apple", "banana", "cherry"],
    onChange: fn(),
  },
};
