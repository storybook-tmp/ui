import type { Meta, StoryObj } from "@storybook/react-vite";
import Accordion, { AccordionCaretIcon } from ".";

const meta = {
  title: "AI Generated/Complex/Accordion",
  component: Accordion,
  args: {
    children:
      "This accordion reveals additional context about the selected task.",
    title: "Task Details",
  },
} satisfies Meta<typeof Accordion>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Collapsed: Story = {};

export const ExpandedWithSubtitle: Story = {
  args: {
    caretIcon: AccordionCaretIcon.Caret,
    defaultOpen: true,
    subtitle: "Includes owner, distro, and execution metadata.",
    toggledTitle: "Task Details (expanded)",
  },
};
