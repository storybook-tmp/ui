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
    title: 'Click to expand',
    children: <p>Accordion content goes here.</p>,
  },
  play: async ({ canvas, userEvent }) => {
    const toggle = canvas.getByText('Click to expand');
    await userEvent.click(toggle);
    const collapseContainer = canvas.getByLabelText('Accordion icon').closest('[data-cy="accordion-toggle"]')
      ?.parentElement?.querySelector('[aria-expanded="true"]');
    await expect(collapseContainer).not.toBeNull();
  },
};

export const DefaultOpen: Story = {
  args: {
    title: 'Already open',
    defaultOpen: true,
    children: <p>This is visible by default.</p>,
  },
};

export const WithSubtitle: Story = {
  args: {
    title: 'Accordion with subtitle',
    subtitle: <span>Some extra info</span>,
    children: <p>Content beneath the subtitle.</p>,
  },
};

export const CaretAlignStart: Story = {
  args: {
    title: 'Caret at start',
    caretAlign: AccordionCaretAlign.Start,
    caretIcon: AccordionCaretIcon.Caret,
    children: <p>Different caret style.</p>,
  },
};
