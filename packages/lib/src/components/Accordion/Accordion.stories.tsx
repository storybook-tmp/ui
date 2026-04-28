import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import Accordion, { AccordionCaretAlign, AccordionCaretIcon } from "./index";

const meta: Meta<typeof Accordion> = {
  component: Accordion,
  tags: ["ai-generated"],
};

export default meta;
type Story = StoryObj<typeof Accordion>;

export const Default: Story = {
  args: {
    title: "Accordion Title",
    children: "This is the accordion content that is hidden by default.",
  },
  play: async ({ canvas, userEvent }) => {
    const toggle = canvas.getByRole("button", { name: /accordion icon/i });
    await expect(toggle).toBeVisible();
    await expect(canvas.getByText("Accordion Title")).toBeVisible();
    // Click to expand
    await userEvent.click(toggle);
    await expect(
      canvas.getByText(
        "This is the accordion content that is hidden by default.",
      ),
    ).toBeVisible();
  },
};

export const DefaultOpen: Story = {
  args: {
    title: "Open Accordion",
    defaultOpen: true,
    children: "This content is visible by default.",
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText("Open Accordion")).toBeVisible();
    await expect(
      canvas.getByText("This content is visible by default."),
    ).toBeVisible();
  },
};

export const WithSubtitle: Story = {
  args: {
    title: "Accordion With Subtitle",
    subtitle: "This is a subtitle below the title",
    defaultOpen: true,
    caretAlign: AccordionCaretAlign.Start,
    caretIcon: AccordionCaretIcon.Caret,
    children: "Content with subtitle and caret icon.",
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText("Accordion With Subtitle")).toBeVisible();
    await expect(
      canvas.getByText("This is a subtitle below the title"),
    ).toBeVisible();
    await expect(
      canvas.getByText("Content with subtitle and caret icon."),
    ).toBeVisible();
  },
};
