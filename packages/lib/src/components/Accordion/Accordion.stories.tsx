import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import Accordion, { AccordionCaretAlign, AccordionCaretIcon } from '.';

const meta = {
  component: Accordion,
  tags: ['ai-generated'],
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Click to expand',
    children: <div>Accordion content goes here</div>,
  },
  play: async ({ canvas, userEvent }) => {
    const toggle = canvas.getByRole('button', { name: /accordion icon/i });
    const container = canvas.getByText('Accordion content goes here');
    // Initially collapsed — aria-expanded should be false
    const collapseContainer = container.closest('[aria-expanded]');
    await expect(collapseContainer).toHaveAttribute('aria-expanded', 'false');
    await userEvent.click(toggle);
    await expect(collapseContainer).toHaveAttribute('aria-expanded', 'true');
  },
};

export const DefaultOpen: Story = {
  args: {
    title: 'Already open',
    children: <div>Visible content</div>,
    defaultOpen: true,
  },
};

export const WithSubtitle: Story = {
  args: {
    title: 'Section Title',
    subtitle: <span>Additional info</span>,
    children: <div>Body content</div>,
  },
};

export const CaretStart: Story = {
  args: {
    title: 'Caret aligned start',
    caretAlign: AccordionCaretAlign.Start,
    caretIcon: AccordionCaretIcon.Caret,
    children: <div>Content</div>,
  },
};
