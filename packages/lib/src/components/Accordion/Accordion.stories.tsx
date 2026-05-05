import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import Accordion, { AccordionCaretIcon } from "./index";

const meta = {
  component: Accordion,
  tags: ["ai-generated"],
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultClosed: Story = {
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

export const ToggleOpen: Story = {
  args: {
    title: "Click to expand",
    children: "Expanded content after clicking the toggle.",
  },
  play: async ({ canvas, userEvent }) => {
    await expect(canvas.getByText("Click to expand")).toBeVisible();
    await userEvent.click(canvas.getByLabelText("Accordion icon"));
    await expect(
      canvas.getByText("Expanded content after clicking the toggle."),
    ).toBeVisible();
  },
};

export const WithSubtitle: Story = {
  args: {
    title: "Main Title",
    subtitle: "Helpful subtitle text",
    children: "Content with subtitle above.",
    defaultOpen: true,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText("Main Title")).toBeVisible();
    await expect(canvas.getByText("Helpful subtitle text")).toBeVisible();
  },
};

export const CaretIcon: Story = {
  args: {
    title: "Caret Style",
    children: "Uses a caret icon instead of chevron.",
    caretIcon: AccordionCaretIcon.Caret,
    defaultOpen: true,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText("Caret Style")).toBeVisible();
    await expect(
      canvas.getByText("Uses a caret icon instead of chevron."),
    ).toBeVisible();
  },
};
