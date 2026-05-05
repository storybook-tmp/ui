import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn } from "storybook/test";
import { TreeSelect, ALL_VALUE } from "./TreeSelect";
import type { TreeDataEntry } from "./TreeSelect";

const sampleData: TreeDataEntry[] = [
  { title: "All", value: ALL_VALUE, key: ALL_VALUE },
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
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof TreeSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NoneSelected: Story = {
  args: {
    tData: sampleData,
    state: [],
    onChange: fn(),
  },
  render: () => {
    const [state, setState] = useState<string[]>([]);
    return <TreeSelect tData={sampleData} state={state} onChange={setState} />;
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText("All")).toBeVisible();
    await expect(canvas.getByText("Fruits")).toBeVisible();
    await expect(canvas.getByText("Vegetables")).toBeVisible();
  },
};

export const SomeSelected: Story = {
  args: {
    tData: sampleData,
    state: ["apple", "banana"],
    onChange: fn(),
  },
  render: () => {
    const [state, setState] = useState<string[]>(["apple", "banana"]);
    return <TreeSelect tData={sampleData} state={state} onChange={setState} />;
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText("Apple")).toBeVisible();
    await expect(canvas.getByText("Banana")).toBeVisible();
  },
};

export const WithFilterControls: Story = {
  args: {
    tData: sampleData,
    state: ["apple"],
    onChange: fn(),
    onReset: fn(),
    onFilter: fn(),
  },
  render: () => {
    const [state, setState] = useState<string[]>(["apple"]);
    return (
      <TreeSelect
        tData={sampleData}
        state={state}
        onChange={setState}
        onReset={() => setState([])}
        onFilter={() => {}}
      />
    );
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText("Reset")).toBeVisible();
    await expect(canvas.getByText("Filter")).toBeVisible();
  },
};
