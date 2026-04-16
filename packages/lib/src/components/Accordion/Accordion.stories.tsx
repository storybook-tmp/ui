import type { Meta, StoryObj } from "@storybook/react-vite";
import Accordion, { AccordionCaretAlign, AccordionCaretIcon } from ".";

const meta = {
  component: Accordion,
  args: {
    title: "Section Title",
    children: "Accordion content",
  },
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Accordion title="Section Title">
      <p>This is the accordion content that is revealed when expanded.</p>
    </Accordion>
  ),
};

export const DefaultOpen: Story = {
  render: () => (
    <Accordion title="Open by Default" defaultOpen>
      <p>This accordion starts in the open state.</p>
    </Accordion>
  ),
};

export const WithSubtitle: Story = {
  render: () => (
    <Accordion title="Main Title" subtitle={<span>Additional context</span>}>
      <p>Content with a subtitle shown below the title.</p>
    </Accordion>
  ),
};

export const CaretIcon: Story = {
  render: () => (
    <Accordion title="Caret Style" caretIcon={AccordionCaretIcon.Caret}>
      <p>This accordion uses the Caret icon instead of Chevron.</p>
    </Accordion>
  ),
};

export const CaretAlignStart: Story = {
  render: () => (
    <Accordion
      title="Caret Aligned to Start"
      caretAlign={AccordionCaretAlign.Start}
      defaultOpen
    >
      <p>The caret icon is aligned to the start of the toggle row.</p>
    </Accordion>
  ),
};

export const WithToggledTitle: Story = {
  render: () => (
    <Accordion title="Click to expand" toggledTitle="Click to collapse">
      <p>The title changes depending on the open/closed state.</p>
    </Accordion>
  ),
};

export const Animated: Story = {
  render: () => (
    <Accordion title="Animated Accordion" disableAnimations={false} defaultOpen>
      <p>This accordion has CSS grid animations enabled for smooth transitions.</p>
    </Accordion>
  ),
};
