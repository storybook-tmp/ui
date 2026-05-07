import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn } from "storybook/test";
import Accordion, { AccordionCaretAlign, AccordionCaretIcon } from ".";

const meta = {
  component: Accordion,
  tags: ["ai-generated"],
  args: {
    onToggle: fn(),
  },
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Collapsed: Story = {
  args: {
    title: "Build details",
    children: "Compilation, test, and artifact information",
  },
  play: async ({ canvas, canvasElement }) => {
    await expect(
      canvas.getByRole("button", { name: /build details/i }),
    ).toBeVisible();
    await expect(
      canvasElement.querySelector('[data-cy="accordion-collapse-container"]'),
    ).toHaveAttribute("aria-expanded", "false");
  },
};

export const DefaultOpen: Story = {
  args: {
    defaultOpen: true,
    title: "Task metadata",
    subtitle: "Variant: ubuntu2204",
    children: "Started by patch author",
  },
  play: async ({ canvas, canvasElement }) => {
    await expect(canvas.getByText("Task metadata")).toBeVisible();
    await expect(
      canvasElement.querySelector('[data-cy="accordion-collapse-container"]'),
    ).toHaveAttribute("aria-expanded", "true");
  },
};

export const TogglesTitle: Story = {
  args: {
    caretAlign: AccordionCaretAlign.Start,
    caretIcon: AccordionCaretIcon.Caret,
    title: "Show command",
    toggledTitle: "Hide command",
    children: "python -m pytest buildscripts/tests",
  },
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.click(
      canvas.getByRole("button", { name: /show command/i }),
    );
    await expect(canvas.getByText("Hide command")).toBeVisible();
    await expect(args.onToggle).toHaveBeenCalledWith({ isVisible: true });
  },
};
