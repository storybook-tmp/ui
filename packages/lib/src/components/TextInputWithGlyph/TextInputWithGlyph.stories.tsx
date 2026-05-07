import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import Icon from "../Icon";
import { TextInputWithGlyph } from ".";

const meta = {
  component: TextInputWithGlyph,
  tags: ["ai-generated"],
} satisfies Meta<typeof TextInputWithGlyph>;

export default meta;
type Story = StoryObj<typeof meta>;

const SearchInputExample = () => {
  const [value, setValue] = useState("");
  return (
    <TextInputWithGlyph
      icon={<Icon glyph="MagnifyingGlass" />}
      label="Task ID"
      onChange={(event) => setValue(event.target.value)}
      placeholder="Search task"
      value={value}
    />
  );
};

export const WithIcon: Story = {
  args: {
    label: "Task ID",
    onChange: () => undefined,
    value: "",
  },
  render: () => <SearchInputExample />,
  play: async ({ canvas, userEvent }) => {
    const input = canvas.getByLabelText("Task ID");
    await userEvent.type(input, "compile");

    await expect(input).toHaveValue("compile");
    await expect(canvas.getByLabelText("Magnifying Glass Icon")).toBeVisible();
  },
};

export const PersistentPlaceholder: Story = {
  args: {
    label: "Build Variant",
    onChange: () => undefined,
    value: "",
  },
  render: () => (
    <TextInputWithGlyph
      label="Build Variant"
      onChange={() => undefined}
      persistentPlaceholder="variant/"
      value=""
    />
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByText("variant/")).toBeVisible();
    await expect(canvas.getByLabelText("Build Variant")).toBeVisible();
  },
};

export const Disabled: Story = {
  args: {
    label: "Project",
    onChange: () => undefined,
    value: "evergreen",
  },
  render: () => (
    <TextInputWithGlyph
      disabled
      label="Project"
      onChange={() => undefined}
      value="evergreen"
    />
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByLabelText("Project")).toHaveAttribute(
      "aria-disabled",
      "true",
    );
  },
};
