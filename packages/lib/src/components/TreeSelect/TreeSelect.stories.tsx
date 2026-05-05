import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn } from "storybook/test";
import { TreeSelect, ALL_VALUE } from "./TreeSelect";
import type { TreeDataEntry } from "./TreeSelect";

const sampleData: TreeDataEntry[] = [
  { title: "All", value: ALL_VALUE, key: "all" },
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
  component: TreeSelect,
  tags: ["ai-generated"],
} satisfies Meta<typeof TreeSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    tData: sampleData,
    state: [],
    onChange: fn(),
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText("All")).toBeVisible();
    await expect(canvas.getByText("Fruits")).toBeVisible();
    await expect(canvas.getByText("Vegetables")).toBeVisible();
  },
};

export const WithSelection: Story = {
  args: {
    tData: sampleData,
    state: ["apple", "banana"],
    onChange: fn(),
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText("Apple")).toBeVisible();
    await expect(canvas.getByText("Banana")).toBeVisible();
  },
};

export const AllSelected: Story = {
  args: {
    tData: sampleData,
    state: [
      ALL_VALUE,
      "fruits",
      "apple",
      "banana",
      "cherry",
      "vegetables",
      "carrot",
      "broccoli",
    ],
    onChange: fn(),
  },
  play: async ({ canvas }) => {
    const checkboxes = canvas.getAllByRole("checkbox");
    for (const checkbox of checkboxes) {
      await expect(checkbox).toBeChecked();
    }
  },
};

export const Interactive: Story = {
  args: {
    tData: sampleData,
    state: [],
    onChange: fn(),
  },
  render: (args) => {
    const [state, setState] = useState<string[]>(args.state);
    return (
      <TreeSelect
        {...args}
        onChange={setState}
        state={state}
      />
    );
  },
  play: async ({ canvas, userEvent }) => {
    const appleLabel = canvas.getByText("Apple");
    await userEvent.click(appleLabel);
    const appleCheckbox = canvas.getByRole("checkbox", { name: /apple/i });
    await expect(appleCheckbox).toBeChecked();
  },
};
