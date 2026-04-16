import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import Accordion, { AccordionCaretAlign, AccordionCaretIcon } from ".";

const meta = {
  args: {
    children: "accordion content",
    title: "collapsed",
  },
  component: Accordion,
} satisfies Meta<typeof Accordion>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    toggledTitle: "expanded",
  },
  play: async ({ canvas, userEvent }) => {
    const toggle = canvas
      .getByText("collapsed")
      .closest('[data-cy="accordion-toggle"]');

    await expect(canvas.getByText("collapsed")).toBeVisible();
    await expect(canvas.getByLabelText("Accordion icon")).toBeVisible();
    await expect(toggle).not.toBeNull();

    await userEvent.click(toggle!);

    await expect(canvas.getByText("expanded")).toBeVisible();
    await expect(canvas.getByText("accordion content")).toBeVisible();
  },
};

export const DefaultOpen: Story = {
  args: {
    defaultOpen: true,
    subtitle: "Additional details live under the title.",
    title: "accordion title",
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText("accordion title")).toBeVisible();
    await expect(
      canvas.getByText("Additional details live under the title."),
    ).toBeVisible();
    await expect(canvas.getByText("accordion content")).toBeVisible();
  },
};

export const CustomCaret: Story = {
  args: {
    caretAlign: AccordionCaretAlign.Start,
    caretIcon: AccordionCaretIcon.Caret,
    title: "custom caret",
  },
  play: async ({ canvas, userEvent }) => {
    const toggle = canvas
      .getByText("custom caret")
      .closest('[data-cy="accordion-toggle"]');

    await expect(canvas.getByText("custom caret")).toBeVisible();
    await expect(toggle).not.toBeNull();

    await userEvent.click(toggle!);

    await expect(canvas.getByText("accordion content")).toBeVisible();
    await expect(canvas.getByLabelText("Accordion icon")).toBeVisible();
  },
};
