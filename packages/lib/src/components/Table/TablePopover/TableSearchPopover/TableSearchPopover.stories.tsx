import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, waitFor, within } from "storybook/test";
import TableSearchPopover from ".";

const meta = {
  component: TableSearchPopover,
  tags: ["ai-generated"],
} satisfies Meta<typeof TableSearchPopover>;

export default meta;
type Story = StoryObj<typeof meta>;

const getSearchInput = (root: ReturnType<typeof within>) => {
  const searchField = root.getByLabelText("Search table");
  const input =
    searchField instanceof HTMLInputElement
      ? searchField
      : searchField.querySelector("input");

  if (!input) {
    throw new Error("Search table input was not rendered.");
  }

  return input;
};

export const Default: Story = {
  args: {
    "data-cy": "storybook-table-search",
    onConfirm: () => undefined,
    placeholder: "Search tasks",
    value: "",
  },
  play: async ({ canvas, canvasElement, userEvent }) => {
    await userEvent.click(
      canvas.getByRole("button", { name: "Table Search Popover Icon" }),
    );

    const page = within(canvasElement.ownerDocument.body);
    await waitFor(() => {
      expect(page.getByLabelText("Search table")).toBeVisible();
    });
    await expect(getSearchInput(page)).toHaveAttribute(
      "placeholder",
      "Search tasks",
    );
  },
};

export const Prefilled: Story = {
  args: {
    "data-cy": "storybook-table-search",
    onConfirm: () => undefined,
    placeholder: "Search task name",
    value: "compile",
  },
  play: async ({ canvas, canvasElement, userEvent }) => {
    await userEvent.click(
      canvas.getByRole("button", { name: "Table Search Popover Icon" }),
    );

    const page = within(canvasElement.ownerDocument.body);
    await waitFor(() => {
      expect(getSearchInput(page)).toHaveValue("compile");
    });
  },
};

const ConfirmingSearchPopover = () => {
  const [value, setValue] = useState("");
  const [confirmed, setConfirmed] = useState("none");
  return (
    <>
      <TableSearchPopover
        data-cy="storybook-table-search"
        onConfirm={(nextValue) => {
          setValue(nextValue);
          setConfirmed(nextValue || "none");
        }}
        placeholder="Search task name"
        value={value}
      />
      <div>Confirmed: {confirmed}</div>
    </>
  );
};

export const ConfirmOnEnter: Story = {
  args: {
    "data-cy": "storybook-table-search",
    onConfirm: () => undefined,
    placeholder: "Search task name",
    value: "",
  },
  render: () => <ConfirmingSearchPopover />,
  play: async ({ canvas, canvasElement, userEvent }) => {
    await userEvent.click(
      canvas.getByRole("button", { name: "Table Search Popover Icon" }),
    );

    const page = within(canvasElement.ownerDocument.body);
    await page.findByLabelText("Search table");
    const input = getSearchInput(page);
    await userEvent.type(input, "compile{Enter}");

    await expect(canvas.getByText("Confirmed: compile")).toBeVisible();
  },
};
