import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Icon } from "@leafygreen-ui/icon";
import { expect } from "storybook/test";
import { TextInputWithGlyph } from ".";

const meta = {
  args: {
    label: "Search",
    onChange: () => {},
    value: "",
  },
  component: TextInputWithGlyph,
} satisfies Meta<typeof TextInputWithGlyph>;

export default meta;

type Story = StoryObj<typeof meta>;

const StatefulTextInputWithGlyph: React.FC<{
  icon?: React.ReactElement;
  persistentPlaceholder?: React.ReactNode;
  type?: "password" | "text";
}> = ({ icon, persistentPlaceholder, type = "text" }) => {
  const [value, setValue] = useState("");

  return (
    <TextInputWithGlyph
      icon={icon}
      label="Search"
      onChange={(event) => setValue(event.target.value)}
      persistentPlaceholder={persistentPlaceholder}
      type={type}
      value={value}
    />
  );
};

export const Default: Story = {
  render: () => <StatefulTextInputWithGlyph />,
  play: async ({ canvas, userEvent }) => {
    const input = canvas.getByLabelText("Search", {
      selector: "input",
    });

    await userEvent.type(input, "storybook");

    await expect(input).toHaveValue("storybook");
  },
};

export const WithGlyph: Story = {
  render: () => (
    <StatefulTextInputWithGlyph icon={<Icon glyph="Warning" />} />
  ),
  play: async ({ canvas, userEvent }) => {
    const input = canvas.getByLabelText("Search", {
      selector: "input",
    });

    await expect(canvas.getByLabelText("Warning Icon")).toBeVisible();
    await userEvent.type(input, "query");
    await expect(input).toHaveValue("query");
  },
};

export const WithPersistentPlaceholder: Story = {
  render: () => (
    <StatefulTextInputWithGlyph persistentPlaceholder="evergreen/" />
  ),
  play: async ({ canvas, userEvent }) => {
    const input = canvas.getByLabelText("Search", {
      selector: "input",
    });

    await expect(canvas.getByText("evergreen/")).toBeVisible();
    await userEvent.type(input, "spruce");

    await expect(input).toHaveValue("spruce");
  },
};
