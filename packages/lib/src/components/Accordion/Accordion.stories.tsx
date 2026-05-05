import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import Accordion, { AccordionCaretIcon } from '.';

const meta = {
  component: Accordion,
  tags: ['ai-generated'],
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Accordion Title',
    children: 'This is the accordion content that is hidden by default.',
  },
  play: async ({ canvas, userEvent }) => {
    const toggle = canvas.getByRole('button', { name: /accordion title/i });
    await expect(toggle).toBeVisible();
    // Content should be collapsed by default
    const container = canvas.getByText('This is the accordion content that is hidden by default.');
    await expect(container.closest('[aria-expanded]')).toHaveAttribute('aria-expanded', 'false');
    // Click to expand
    await userEvent.click(toggle);
    await expect(container.closest('[aria-expanded]')).toHaveAttribute('aria-expanded', 'true');
  },
};

export const DefaultOpen: Story = {
  args: {
    title: 'Open Accordion',
    children: 'This content is visible from the start.',
    defaultOpen: true,
  },
  play: async ({ canvas }) => {
    const toggle = canvas.getByRole('button', { name: /open accordion/i });
    await expect(toggle).toBeVisible();
    const container = canvas.getByText('This content is visible from the start.');
    await expect(container.closest('[aria-expanded]')).toHaveAttribute('aria-expanded', 'true');
  },
};

export const WithSubtitle: Story = {
  args: {
    title: 'Accordion With Subtitle',
    subtitle: 'This is a helpful subtitle',
    children: 'Content below the subtitle accordion.',
    defaultOpen: true,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Accordion With Subtitle')).toBeVisible();
    await expect(canvas.getByText('This is a helpful subtitle')).toBeVisible();
    await expect(canvas.getByText('Content below the subtitle accordion.')).toBeVisible();
  },
};

export const WithCaretIcon: Story = {
  args: {
    title: 'Caret Style Accordion',
    children: 'Using the caret icon instead of chevron.',
    caretIcon: AccordionCaretIcon.Caret,
    defaultOpen: true,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Caret Style Accordion')).toBeVisible();
    await expect(canvas.getByText('Using the caret icon instead of chevron.')).toBeVisible();
  },
};

export const CssCheck: Story = {
  args: {
    title: 'Styled Accordion',
    children: 'Checking CSS is loaded.',
    defaultOpen: true,
  },
  play: async ({ canvas }) => {
    const toggle = canvas.getByRole('button', { name: /styled accordion/i });
    // AccordionToggle uses display: flex via Emotion
    const toggleContainer = toggle.closest('[role="button"]') as HTMLElement;
    await expect(getComputedStyle(toggleContainer).display).toBe('flex');
  },
};
