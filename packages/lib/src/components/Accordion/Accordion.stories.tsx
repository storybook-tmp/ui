import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import Accordion, {
  AccordionCaretAlign,
  AccordionCaretIcon,
} from ".";

const meta = {
  component: Accordion,
  tags: ["ai-generated"],
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

const getCollapseContainer = (canvasElement: HTMLElement) =>
  canvasElement.querySelector('[data-cy="accordion-collapse-container"]');

export const Collapsed: Story = {
  args: {
    children: "The task details are hidden until the row is expanded.",
    title: "Task details",
  },
  play: async ({ canvas, canvasElement }) => {
    await expect(canvas.getByText("Task details")).toBeVisible();
    await expect(getCollapseContainer(canvasElement)).toHaveAttribute(
      "aria-expanded",
      "false",
    );
  },
};

export const DefaultOpen: Story = {
  args: {
    children: "Execution task, build variant, and host information.",
    defaultOpen: true,
    subtitle: "Expanded by default",
    title: "Metadata",
  },
  play: async ({ canvas, canvasElement }) => {
    await expect(canvas.getByText("Metadata")).toBeVisible();
    await expect(canvas.getByText("Expanded by default")).toBeVisible();
    await expect(getCollapseContainer(canvasElement)).toHaveAttribute(
      "aria-expanded",
      "true",
    );
  },
};

export const Interactive: Story = {
  args: {
    caretAlign: AccordionCaretAlign.Start,
    caretIcon: AccordionCaretIcon.Caret,
    children: "The expanded state is managed internally.",
    title: "Collapsed title",
    toggledTitle: "Expanded title",
  },
  play: async ({ canvas, canvasElement, userEvent }) => {
    const toggle = canvas.getByRole("button", { name: /collapsed title/i });
    await userEvent.click(toggle);

    await expect(canvas.getByText("Expanded title")).toBeVisible();
    await expect(getCollapseContainer(canvasElement)).toHaveAttribute(
      "aria-expanded",
      "true",
    );
  },
};
