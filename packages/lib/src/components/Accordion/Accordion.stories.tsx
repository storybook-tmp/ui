import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import Accordion, { AccordionCaretAlign, AccordionCaretIcon } from '.';

const meta = {
  component: Accordion,
  tags: ['ai-generated'],
  args: {
    title: 'Accordion Title',
    children: <div>Accordion content goes here.</div>,
  },
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const collapse = canvasElement.querySelector('[aria-expanded]');
    await expect(collapse).toHaveAttribute('aria-expanded', 'false');
  },
};

export const DefaultOpen: Story = {
  args: {
    defaultOpen: true,
  },
  play: async ({ canvas }) => {
    const container = canvas.getByLabelText('Accordion icon').closest('[data-cy="accordion-toggle"]')?.parentElement;
    const collapse = container?.querySelector('[aria-expanded]');
    await expect(collapse).toHaveAttribute('aria-expanded', 'true');
  },
};

export const WithSubtitle: Story = {
  args: {
    subtitle: <span>This is a subtitle</span>,
    defaultOpen: true,
  },
};

export const CaretAlignStart: Story = {
  args: {
    caretAlign: AccordionCaretAlign.Start,
    defaultOpen: true,
  },
};

export const WithCaretIcon: Story = {
  args: {
    caretIcon: AccordionCaretIcon.Caret,
  },
};
