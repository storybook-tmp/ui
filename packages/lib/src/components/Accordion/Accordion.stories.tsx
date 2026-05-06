import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import Accordion, { AccordionCaretAlign, AccordionCaretIcon } from './index';

const meta = {
  component: Accordion,
  tags: ['ai-generated'],
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Accordion Title',
    children: <div>Accordion content goes here</div>,
    defaultOpen: false,
  },
  play: async ({ canvas, userEvent, canvasElement }) => {
    // Find the collapse container via aria-expanded attribute
    const collapseContainer = canvasElement.querySelector('[aria-expanded]') as HTMLElement;
    await expect(collapseContainer).toHaveAttribute('aria-expanded', 'false');
    // Click the toggle row to expand
    const toggle = canvas.getByRole('button', { name: /accordion icon/i });
    await userEvent.click(toggle);
    await expect(collapseContainer).toHaveAttribute('aria-expanded', 'true');
  },
};

export const DefaultOpen: Story = {
  args: {
    title: 'Open Accordion',
    children: <div>This content is visible by default</div>,
    defaultOpen: true,
  },
};

export const WithSubtitle: Story = {
  args: {
    title: 'Accordion with Subtitle',
    subtitle: <span>Additional info</span>,
    children: <div>Content with subtitle</div>,
    defaultOpen: true,
  },
};

export const CaretStart: Story = {
  args: {
    title: 'Caret at Start',
    children: <div>Caret aligned to start</div>,
    caretAlign: AccordionCaretAlign.Start,
    caretIcon: AccordionCaretIcon.Caret,
  },
};

export const NoIndent: Story = {
  args: {
    title: 'No Indent',
    children: <div>Content without indent</div>,
    useIndent: false,
    defaultOpen: true,
  },
};
