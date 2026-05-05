import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import Accordion, { AccordionCaretIcon } from "./index";

const meta = {
  component: Accordion,
  tags: ["ai-generated"],
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Accordion Title",
    children: "This is the accordion content that is hidden by default.",
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText("Accordion Title")).toBeVisible();
    await expect(canvas.getByLabelText("Accordion icon")).toBeVisible();
  },
};

export const DefaultOpen: Story = {
  args: {
    title: "Open Accordion",
    children: "This content is visible because defaultOpen is true.",
    defaultOpen: true,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText("Open Accordion")).toBeVisible();
    await expect(
      canvas.getByText(
        "This content is visible because defaultOpen is true.",
      ),
    ).toBeVisible();
  },
};

export const WithSubtitle: Story = {
  args: {
    title: "Accordion With Subtitle",
    subtitle: "This is a subtitle below the title",
    children: "Content inside the accordion.",
    defaultOpen: true,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText("Accordion With Subtitle")).toBeVisible();
    await expect(
      canvas.getByText("This is a subtitle below the title"),
    ).toBeVisible();
  },
};

export const WithCaretIcon: Story = {
  args: {
    title: "Caret Style Accordion",
    children: "Uses the Caret icon instead of Chevron.",
    caretIcon: AccordionCaretIcon.Caret,
    defaultOpen: true,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText("Caret Style Accordion")).toBeVisible();
  },
};

export const CssCheck: Story = {
  args: {
    title: "Styled Accordion",
    children: "Checking that emotion styles are applied.",
    defaultOpen: false,
    "data-cy": "css-check-accordion",
  },
  play: async ({ canvasElement }) => {
    const toggle = canvasElement.querySelector(
      '[data-cy="accordion-toggle"]',
    ) as HTMLElement;
    await expect(getComputedStyle(toggle).display).toBe("flex");
    await expect(getComputedStyle(toggle).alignItems).toBe("center");
  },
};
