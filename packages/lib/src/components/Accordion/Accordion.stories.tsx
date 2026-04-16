import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import Accordion, { AccordionCaretAlign } from ".";

const meta = {
  component: Accordion,
} satisfies Meta<typeof Accordion>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Collapsed: Story = {
  args: {
    title: "collapsed",
    toggledTitle: "expanded",
    children: "accordion content",
  },
  play: async ({ canvas, userEvent }) => {
    const toggle = canvas.getByText("collapsed").closest(
      "[data-cy='accordion-toggle']",
    );
    if (!toggle) {
      throw new Error("Accordion toggle was not rendered.");
    }
    await expect(canvas.getByText("collapsed")).toBeVisible();
    await expect(
      canvas.getByText("accordion content"),
    ).toBeInTheDocument();
    await expect(
      canvas.getByText("accordion content").closest("[aria-expanded]"),
    ).toHaveAttribute("aria-expanded", "false");
    await userEvent.click(toggle);
    await expect(canvas.getByText("expanded")).toBeVisible();
    await expect(
      canvas.getByText("accordion content"),
    ).toBeVisible();
    await expect(
      canvas.getByText("accordion content").closest("[aria-expanded]"),
    ).toHaveAttribute("aria-expanded", "true");
  },
};

export const DefaultOpen: Story = {
  args: {
    defaultOpen: true,
    subtitle: "Shared accordion subtitle",
    title: "accordion title",
    children: "accordion content",
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText("accordion title")).toBeVisible();
    await expect(canvas.getByText("Shared accordion subtitle")).toBeVisible();
    await expect(canvas.getByText("accordion content")).toBeVisible();
  },
};

export const Controlled: Story = {
  args: {
    children: "controlled accordion content",
    title: "controlled accordion",
  },
  render: () => {
    const [open, setOpen] = useState(true);

    return (
      <Accordion
        caretAlign={AccordionCaretAlign.Start}
        onToggle={({ isVisible }) => setOpen(isVisible)}
        open={open}
        title="controlled accordion"
        toggledTitle="controlled accordion"
      >
        controlled accordion content
      </Accordion>
    );
  },
  play: async ({ canvas, userEvent }) => {
    const toggle = canvas.getByText("controlled accordion").closest(
      "[data-cy='accordion-toggle']",
    );
    if (!toggle) {
      throw new Error("Accordion toggle was not rendered.");
    }
    await expect(canvas.getByText("controlled accordion content")).toBeVisible();
    await userEvent.click(toggle);
    await expect(
      canvas.getByText("controlled accordion content").closest("[aria-expanded]"),
    ).toHaveAttribute("aria-expanded", "false");
    await userEvent.click(toggle);
    await expect(
      canvas.getByText("controlled accordion content"),
    ).toBeVisible();
  },
};
