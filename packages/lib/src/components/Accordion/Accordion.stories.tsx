import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import Accordion, { AccordionCaretAlign, AccordionCaretIcon } from './index';

const meta = {
  component: Accordion,
  tags: ['ai-generated'],
  args: {
    title: 'Click to expand',
    children: <div>Accordion content goes here</div>,
  },
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('button', { name: /accordion icon/i })).toBeVisible();
    const container = canvas.getByText('Accordion content goes here').closest('[aria-expanded]');
    await expect(container).toHaveAttribute('aria-expanded', 'false');
  },
};

export const DefaultOpen: Story = {
  args: { defaultOpen: true },
};

export const WithSubtitle: Story = {
  args: {
    subtitle: <span>Additional info</span>,
    defaultOpen: true,
  },
};

export const CaretStart: Story = {
  args: { caretAlign: AccordionCaretAlign.Start },
};

export const CaretIcon: Story = {
  args: { caretIcon: AccordionCaretIcon.Caret },
};

export const Controlled: Story = {
  args: { open: true },
};
