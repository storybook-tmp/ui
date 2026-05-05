import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, waitFor } from "storybook/test";
import Accordion, { AccordionCaretAlign, AccordionCaretIcon } from "./index";

const meta = {
  component: Accordion,
  tags: ["ai-generated"],
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Click to expand",
    children: <p>This is the accordion content.</p>,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText("Click to expand")).toBeVisible();
    await expect(
      canvas.getByLabelText("Accordion icon"),
    ).toBeInTheDocument();
  },
};

export const DefaultOpen: Story = {
  args: {
    title: "Expanded accordion",
    defaultOpen: true,
    children: <p>This content is visible by default.</p>,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText("Expanded accordion")).toBeVisible();
    await expect(
      canvas.getByText("This content is visible by default."),
    ).toBeVisible();
  },
};

export const ToggleInteraction: Story = {
  args: {
    title: "Toggle me",
    children: <p>Hidden content revealed!</p>,
    disableAnimations: true,
  },
  play: async ({ canvas, canvasElement, userEvent }) => {
    const collapseContainer = canvasElement.querySelector(
      '[data-cy="accordion-collapse-container"]',
    ) as HTMLElement;
    await expect(collapseContainer).toHaveAttribute("aria-expanded", "false");
    const toggle = canvas.getByRole("button", { name: /accordion icon/i });
    await userEvent.click(toggle);
    await expect(collapseContainer).toHaveAttribute("aria-expanded", "true");
    await expect(
      canvas.getByText("Hidden content revealed!"),
    ).toBeVisible();
  },
};

export const WithSubtitle: Story = {
  args: {
    title: "Main title",
    subtitle: <span>Additional information</span>,
    children: <p>Body content</p>,
    defaultOpen: true,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText("Main title")).toBeVisible();
    await expect(canvas.getByText("Additional information")).toBeVisible();
    await expect(canvas.getByText("Body content")).toBeVisible();
  },
};

export const CssCheck: Story = {
  args: {
    title: "Styled accordion",
    children: <p>Content</p>,
  },
  play: async ({ canvas }) => {
    const toggle = canvas.getByRole("button", { name: /accordion icon/i }).parentElement!;
    await expect(getComputedStyle(toggle).display).toBe("flex");
  },
};
