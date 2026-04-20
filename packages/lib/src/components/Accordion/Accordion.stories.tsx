import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn } from "storybook/test";
import Accordion, { AccordionCaretAlign, AccordionCaretIcon } from ".";

const meta = {
  component: Accordion,
  args: {
    children: "linux-64, ubuntu2004, enterprise-rhel-80",
    title: "Build variants",
  },
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Collapsed: Story = {
  args: {
    toggledTitle: "Hide build variants",
  },
  play: async ({ canvas, canvasElement, userEvent }) => {
    const toggle = canvas.getByRole("button", { name: /build variants/i });
    const collapseContainer = canvasElement.querySelector(
      '[data-cy="accordion-collapse-container"]',
    );

    await expect(toggle).toBeVisible();
    await expect(collapseContainer).toHaveAttribute("aria-expanded", "false");

    await userEvent.click(toggle);

    await expect(canvas.getByText("Hide build variants")).toBeVisible();
    await expect(collapseContainer).toHaveAttribute("aria-expanded", "true");
  },
};

export const OpenByDefault: Story = {
  args: {
    defaultOpen: true,
    subtitle: "3 selected",
    toggledTitle: "Hide build variants",
  },
  play: async ({ canvas, canvasElement }) => {
    const collapseContainer = canvasElement.querySelector(
      '[data-cy="accordion-collapse-container"]',
    );

    await expect(canvas.getByText("Hide build variants")).toBeVisible();
    await expect(canvas.getByText("3 selected")).toBeVisible();
    await expect(collapseContainer).toHaveAttribute("aria-expanded", "true");
  },
};

export const CaretAlignedStart: Story = {
  args: {
    caretAlign: AccordionCaretAlign.Start,
    caretIcon: AccordionCaretIcon.Caret,
    onToggle: fn(),
    title: "Failing tests",
  },
  play: async ({ args, canvas, canvasElement, userEvent }) => {
    const toggle = canvas.getByRole("button", { name: /failing tests/i });
    const collapseContainer = canvasElement.querySelector(
      '[data-cy="accordion-collapse-container"]',
    );

    await userEvent.click(toggle);

    await expect(args.onToggle).toHaveBeenCalledWith({ isVisible: true });
    await expect(collapseContainer).toHaveAttribute("aria-expanded", "true");
  },
};
