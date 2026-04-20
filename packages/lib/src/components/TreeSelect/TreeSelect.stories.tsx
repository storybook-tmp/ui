import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { ALL_VALUE, TreeDataEntry, TreeSelect } from ".";

const statusOptions: TreeDataEntry[] = [
  {
    title: "All",
    value: ALL_VALUE,
    key: ALL_VALUE,
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

const nestedStatusOptions: TreeDataEntry[] = [
  {
    title: "All",
    value: ALL_VALUE,
    key: ALL_VALUE,
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
  component: TreeSelect,
  args: {
    onChange: () => {},
    state: [],
    tData: statusOptions,
  },
} satisfies Meta<typeof TreeSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FlatOptions: Story = {
  render: (args) => <TreeSelectStory {...args} />,
  play: async ({ canvas, userEvent }) => {
    const passCheckbox = canvas.getByLabelText("Pass");

    await expect(passCheckbox).not.toBeChecked();
    await userEvent.click(canvas.getByText("Pass"));

    await expect(passCheckbox).toBeChecked();
    await expect(canvas.getByText("Pass selected")).toBeVisible();
  },
};

export const NestedOptions: Story = {
  args: {
    tData: nestedStatusOptions,
  },
  render: (args) => (
    <TreeSelectStory
      {...args}
      initialState={["failing-umbrella", "system-failure", "fail"]}
    />
  ),
  play: async ({ canvas, userEvent }) => {
    const umbrellaCheckbox = canvas.getByLabelText("Failing Umbrella");
    const failCheckbox = canvas.getByLabelText("Fail");

    await expect(umbrellaCheckbox).toBeChecked();
    await expect(failCheckbox).toBeChecked();

    await userEvent.click(canvas.getByText("Fail"));

    await expect(umbrellaCheckbox).not.toBeChecked();
    await expect(failCheckbox).not.toBeChecked();
  },
};

export const WithFilterControls: Story = {
  render: (args) => <TreeSelectStory {...args} withControls />,
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByText("All"));
    await expect(canvas.getByText("All selected")).toBeVisible();

    await userEvent.click(canvas.getByRole("button", { name: "Filter" }));
    await expect(canvas.getByText("Applied filters")).toBeVisible();

    await userEvent.click(canvas.getByRole("button", { name: "Reset" }));
    await expect(canvas.getByText("No statuses selected")).toBeVisible();
  },
};

const TreeSelectStory = ({
  initialState = [],
  tData,
  withControls = false,
  ...args
}: React.ComponentProps<typeof TreeSelect> & {
  initialState?: string[];
  withControls?: boolean;
}) => {
  const [state, setState] = useState(initialState);
  const [optionsLabel, setOptionsLabel] = useState("");
  const [lastAction, setLastAction] = useState("");

  return (
    <>
      <TreeSelect
        {...args}
        onChange={setState}
        onFilter={
          withControls ? () => setLastAction("Applied filters") : undefined
        }
        onReset={
          withControls
            ? () => {
                setState([]);
                setLastAction("Reset filters");
              }
            : undefined
        }
        setOptionsLabel={setOptionsLabel}
        state={state}
        tData={tData}
      />
      <p>
        {optionsLabel ? `${optionsLabel} selected` : "No statuses selected"}
      </p>
      {lastAction && <p>{lastAction}</p>}
    </>
  );
};
