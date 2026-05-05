import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import Accordion, { AccordionCaretAlign, AccordionCaretIcon } from './index';

const meta = {
  component: Accordion,
  tags: ['ai-generated'],
  args: {
    title: 'Accordion Title',
    children: 'Accordion content goes here.',
  },
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas, canvasElement }) => {
    await expect(canvas.getByRole('button', { name: /accordion icon/i })).toBeVisible();
    // aria-expanded is false by default on the collapse container
    const collapseContainer = canvasElement.querySelector('[aria-expanded]');
    await expect(collapseContainer).toHaveAttribute('aria-expanded', 'false');
  },
};

export const DefaultOpen: Story = {
  args: { defaultOpen: true },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Accordion content goes here.')).toBeVisible();
  },
};

export const WithSubtitle: Story = {
  args: {
    subtitle: 'A subtitle below the header',
  },
};

export const CaretAlignStart: Story = {
  args: {
    caretAlign: AccordionCaretAlign.Start,
    caretIcon: AccordionCaretIcon.Caret,
    title: 'Start-aligned caret',
    defaultOpen: true,
  },
};

export const ToggledTitle: Story = {
  args: {
    title: 'Show more',
    toggledTitle: 'Show less',
    defaultOpen: false,
  },
  play: async ({ canvas, userEvent }) => {
    await expect(canvas.getByText('Show more')).toBeVisible();
    await userEvent.click(canvas.getByRole('button', { name: /accordion icon/i }));
    await expect(canvas.getByText('Show less')).toBeVisible();
  },
};
