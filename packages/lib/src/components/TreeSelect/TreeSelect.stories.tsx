import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, waitFor } from "storybook/test";
import { TreeSelect, TreeDataEntry, ALL_VALUE } from "./TreeSelect";

const sampleData: TreeDataEntry[] = [
  { title: "All", value: ALL_VALUE, key: "all" },
  {
    title: "Failures",
    value: "failures",
    key: "failures",
    children: [
      { title: "Test Failed", value: "test-failed", key: "test-failed" },
      { title: "Setup Failed", value: "setup-failed", key: "setup-failed" },
    ],
  },
  {
    title: "Success",
    value: "success",
    key: "success",
  },
];

const meta = {
  component: TreeSelect,
  tags: ["ai-generated"],
  args: {
    state: [],
    tData: sampleData,
    onChange: () => {},
  },
} satisfies Meta<typeof TreeSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [state, setState] = useState<string[]>([]);
    return (
      <TreeSelect state={state} tData={sampleData} onChange={setState} />
    );
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText("All")).toBeVisible();
    await expect(canvas.getByText("Failures")).toBeVisible();
    await expect(canvas.getByText("Success")).toBeVisible();
  },
};

export const AllSelected: Story = {
  render: () => {
    const allValues = [
      ALL_VALUE,
      "failures",
      "test-failed",
      "setup-failed",
      "success",
    ];
    const [state, setState] = useState<string[]>(allValues);
    return (
      <TreeSelect state={state} tData={sampleData} onChange={setState} />
    );
  },
  play: async ({ canvas }) => {
    const checkboxes = canvas.getAllByRole("checkbox");
    for (const cb of checkboxes) {
      await expect(cb).toBeChecked();
    }
  },
};

export const WithCheckboxInteraction: Story = {
  render: () => {
    const [state, setState] = useState<string[]>([]);
    return (
      <TreeSelect state={state} tData={sampleData} onChange={setState} />
    );
  },
  play: async ({ canvas, userEvent }) => {
    const successLabel = canvas.getByText("Success");
    await userEvent.click(successLabel);
    const successCheckbox = canvas.getByLabelText("Success");
    await waitFor(() => expect(successCheckbox).toBeChecked());
  },
};
