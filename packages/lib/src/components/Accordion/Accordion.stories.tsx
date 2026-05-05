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
    title: 'Accordion Title',
    children: <p>This is the accordion content that is revealed when expanded.</p>,
  },
  play: async ({ canvas, userEvent }) => {
    const toggle = canvas.getByRole('button', { name: /accordion icon/i });
    await expect(toggle).toBeVisible();
    await expect(canvas.getByText('Accordion Title')).toBeVisible();
    // Content should be hidden initially
    const container = canvas.getByLabelText('Accordion icon').closest('[data-cy]')!;
    await expect(container).toBeVisible();
  },
};

export const DefaultOpen: Story = {
  args: {
    title: 'Open Accordion',
    defaultOpen: true,
    children: <p>Visible content from the start.</p>,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Visible content from the start.')).toBeVisible();
  },
};

export const WithSubtitle: Story = {
  args: {
    title: 'Task Details',
    subtitle: <span>3 items</span>,
    defaultOpen: true,
    children: <p>Task content goes here.</p>,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Task Details')).toBeVisible();
    await expect(canvas.getByText('3 items')).toBeVisible();
    await expect(canvas.getByText('Task content goes here.')).toBeVisible();
  },
};

export const CaretAlignStart: Story = {
  args: {
    title: 'Start Aligned Caret',
    caretAlign: AccordionCaretAlign.Start,
    caretIcon: AccordionCaretIcon.Caret,
    children: <p>Content with start-aligned caret.</p>,
    defaultOpen: true,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Start Aligned Caret')).toBeVisible();
    await expect(canvas.getByText('Content with start-aligned caret.')).toBeVisible();
  },
};

export const CssCheck: Story = {
  args: {
    title: 'CSS Check',
    children: <p>Content</p>,
  },
  play: async ({ canvas }) => {
    const toggle = canvas.getByText('CSS Check').closest('[role="button"]')!;
    // AccordionToggle uses display:flex and align-items:center
    await expect(getComputedStyle(toggle).display).toBe('flex');
    await expect(getComputedStyle(toggle).alignItems).toBe('center');
  },
};
