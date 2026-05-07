import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import Accordion, { AccordionCaretAlign, AccordionCaretIcon } from ".";

const meta = {
  component: Accordion,
  tags: ["ai-generated"],
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Collapsed: Story = {
  args: {
    children: "Build variants and tasks remain hidden until expanded.",
    title: "Build details",
    toggledTitle: "Hide build details",
  },
  play: async ({ canvas, canvasElement, userEvent }) => {
    const toggle = canvas.getByText("Build details").closest('[role="button"]');
    const content = canvasElement.querySelector(
      '[data-cy="accordion-collapse-container"]',
    );

    await expect(content).toHaveAttribute("aria-expanded", "false");
    await userEvent.click(toggle as HTMLElement);
    await expect(content).toHaveAttribute("aria-expanded", "true");
    await expect(canvas.getByText("Hide build details")).toBeInTheDocument();
  },
};

export const DefaultOpen: Story = {
  args: {
    children: "This content is visible by default.",
    defaultOpen: true,
    title: "Expanded section",
  },
};

export const WithSubtitle: Story = {
  args: {
    caretAlign: AccordionCaretAlign.Start,
    caretIcon: AccordionCaretIcon.Caret,
    children: "Additional execution metadata.",
    subtitle: "Last updated 2 minutes ago",
    title: "Execution metadata",
  },
};
