import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, waitFor } from "storybook/test";
import Accordion, { AccordionCaretIcon } from ".";

const meta = {
  component: Accordion,
  tags: ["ai-generated"],
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Accordion Title",
    children: <p>Accordion body content goes here.</p>,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText("Accordion Title")).toBeVisible();
  },
};

export const DefaultOpen: Story = {
  args: {
    title: "Open Accordion",
    defaultOpen: true,
    children: <p>This content is visible by default.</p>,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText("Open Accordion")).toBeVisible();
    await expect(
      canvas.getByText("This content is visible by default."),
    ).toBeVisible();
  },
};

export const WithCaretIcon: Story = {
  args: {
    title: "Caret Accordion",
    caretIcon: AccordionCaretIcon.Caret,
    defaultOpen: true,
    children: <p>Uses a caret icon instead of chevron.</p>,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText("Caret Accordion")).toBeVisible();
    await expect(
      canvas.getByText("Uses a caret icon instead of chevron."),
    ).toBeVisible();
  },
};

export const Toggled: Story = {
  args: {
    title: "Click to Expand",
    toggledTitle: "Click to Collapse",
    children: <p>Toggled content.</p>,
  },
  play: async ({ canvas, userEvent }) => {
    await expect(canvas.getByText("Click to Expand")).toBeVisible();
    await userEvent.click(canvas.getByRole("button", { name: /accordion/i }));
    await waitFor(() =>
      expect(canvas.getByText("Click to Collapse")).toBeVisible(),
    );
  },
};

export const CssCheck: Story = {
  args: {
    title: "Styled Accordion",
    defaultOpen: false,
    children: <p>Content</p>,
  },
  play: async ({ canvas }) => {
    const toggle = canvas.getByText("Styled Accordion").closest("div")!;
    // AccordionToggle uses display: flex
    await expect(getComputedStyle(toggle).display).toBe("flex");
  },
};
