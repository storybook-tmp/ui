import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { TextInputWithGlyph } from ".";

const meta = {
  args: {
    label: "Input",
  },
  component: TextInputWithGlyph,
  title: "Components/TextInputWithGlyph",
} satisfies Meta<typeof TextInputWithGlyph>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  play: async ({ mount, userEvent }) => {
    const canvas = await mount(
      <TextInputWithGlyph label="Task filter" placeholder="Filter tasks" />,
    );
    const input = await canvas.findByLabelText("Task filter", {
      selector: "input",
    });

    await userEvent.type(input, "compile");
    await expect(input).toHaveValue("compile");
  },
};

export const PersistentPlaceholder: Story = {
  play: async ({ mount }) => {
    const canvas = await mount(
      <TextInputWithGlyph
        label="Revision"
        persistentPlaceholder="mongodb/"
        placeholder="spruce"
      />,
    );

    await expect(await canvas.findByText("mongodb/")).toBeVisible();
    await expect(
      await canvas.findByLabelText("Revision", { selector: "input" }),
    ).toHaveValue("");
  },
};

export const WithGlyph: Story = {
  play: async ({ mount }) => {
    const canvas = await mount(
      <TextInputWithGlyph
        defaultValue="42"
        icon={<span aria-label="percent glyph">%</span>}
        label="Success rate"
      />,
    );

    await expect(
      await canvas.findByLabelText("Success rate", { selector: "input" }),
    ).toHaveValue("42");
    await expect(await canvas.findByLabelText("percent glyph")).toBeVisible();
  },
};
