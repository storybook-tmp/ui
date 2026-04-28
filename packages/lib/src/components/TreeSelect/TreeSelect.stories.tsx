import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn } from "storybook/test";
import { useState } from "react";
import { ALL_VALUE, TreeSelect } from "./TreeSelect";
import type { TreeDataEntry } from "./TreeSelect";

const sampleData: TreeDataEntry[] = [
  {
    title: "All",
    value: ALL_VALUE,
    key: ALL_VALUE,
  },
  {
    title: "Build Variants",
    value: "buildVariants",
    key: "buildVariants",
    children: [
      { title: "Ubuntu 20.04", value: "ubuntu2004", key: "ubuntu2004" },
      { title: "Windows", value: "windows", key: "windows" },
      { title: "macOS", value: "macos", key: "macos" },
    ],
  },
  {
    title: "Task Status",
    value: "taskStatus",
    key: "taskStatus",
    children: [
      { title: "Succeeded", value: "succeeded", key: "succeeded" },
      { title: "Failed", value: "failed", key: "failed" },
    ],
  },
];

const meta: Meta<typeof TreeSelect> = {
  component: TreeSelect,
  tags: ["ai-generated"],
};

export default meta;
type Story = StoryObj<typeof TreeSelect>;

export const Default: Story = {
  render: () => {
    const [state, setState] = useState<string[]>([]);
    return <TreeSelect onChange={setState} state={state} tData={sampleData} />;
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText("All")).toBeVisible();
    await expect(canvas.getByText("Build Variants")).toBeVisible();
    await expect(canvas.getByText("Ubuntu 20.04")).toBeVisible();
    await expect(canvas.getByText("Task Status")).toBeVisible();
  },
};

export const WithSelections: Story = {
  render: () => {
    const [state, setState] = useState<string[]>(["ubuntu2004", "failed"]);
    return <TreeSelect onChange={setState} state={state} tData={sampleData} />;
  },
  play: async ({ canvas }) => {
    const checkboxes = canvas.getAllByRole("checkbox");
    await expect(checkboxes.length).toBeGreaterThan(0);
    await expect(canvas.getByText("Ubuntu 20.04")).toBeVisible();
  },
};

export const AllSelected: Story = {
  render: () => {
    const [state, setState] = useState<string[]>([
      ALL_VALUE,
      "buildVariants",
      "ubuntu2004",
      "windows",
      "macos",
      "taskStatus",
      "succeeded",
      "failed",
    ]);
    return <TreeSelect onChange={setState} state={state} tData={sampleData} />;
  },
  play: async ({ canvas, userEvent }) => {
    const allCheckbox = canvas.getAllByRole("checkbox")[0];
    await expect(allCheckbox).toBeChecked();
    // Click the label text instead of the hidden checkbox input
    const allLabel = canvas.getByText("All");
    await userEvent.click(allLabel);
    const checkboxes = canvas.getAllByRole("checkbox");
    for (const cb of checkboxes) {
      await expect(cb).not.toBeChecked();
    }
  },
};
