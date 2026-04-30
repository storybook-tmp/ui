import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import Accordion, { AccordionCaretAlign, AccordionCaretIcon } from ".";

const meta = {
  title: "AI Generated/Complex/Accordion",
  component: Accordion,
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Click to expand",
    children: <p>This is the accordion content that is revealed when expanded.</p>,
    defaultOpen: false,
    onToggle: fn(),
  },
};

export const OpenByDefault: Story = {
  args: {
    title: "Expanded section",
    subtitle: "Additional information below",
    children: (
      <div>
        <p>This accordion starts open.</p>
        <p>It also shows a subtitle.</p>
      </div>
    ),
    defaultOpen: true,
    caretAlign: AccordionCaretAlign.Start,
    caretIcon: AccordionCaretIcon.Caret,
    disableAnimations: false,
    onToggle: fn(),
  },
};
