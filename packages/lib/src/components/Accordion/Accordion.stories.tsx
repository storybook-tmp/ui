import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, waitFor } from 'storybook/test';
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
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Accordion Title')).toBeVisible();
    // Content is collapsed by default
    const container = canvas.getByLabelText('Accordion icon');
    await expect(container).toBeVisible();
  },
};

export const DefaultOpen: Story = {
  args: {
    title: 'Open Accordion',
    defaultOpen: true,
    children: <div>This content is visible by default</div>,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Open Accordion')).toBeVisible();
    await expect(canvas.getByText('This content is visible by default')).toBeVisible();
  },
};

export const WithSubtitle: Story = {
  args: {
    title: 'Accordion With Subtitle',
    subtitle: <span>This is the subtitle</span>,
    defaultOpen: true,
    children: <div>Main accordion content</div>,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Accordion With Subtitle')).toBeVisible();
    await expect(canvas.getByText('This is the subtitle')).toBeVisible();
    await expect(canvas.getByText('Main accordion content')).toBeVisible();
  },
};

export const WithCaretIcon: Story = {
  args: {
    title: 'Caret Icon Accordion',
    caretIcon: AccordionCaretIcon.Caret,
    caretAlign: AccordionCaretAlign.Start,
    defaultOpen: false,
    children: <div>Hidden content</div>,
  },
  play: async ({ canvas, userEvent }) => {
    await expect(canvas.getByText('Caret Icon Accordion')).toBeVisible();
    // Click to expand
    await userEvent.click(canvas.getByText('Caret Icon Accordion'));
    await expect(canvas.getByText('Hidden content')).toBeVisible();
  },
};

export const CssCheck: Story = {
  args: {
    title: 'CSS Check',
    defaultOpen: true,
    children: <div>Content</div>,
  },
  play: async ({ canvas }) => {
    const toggle = canvas.getByRole('button', { name: /accordion/i });
    // AccordionToggle uses display: flex
    const toggleParent = toggle.closest('[data-cy="accordion-toggle"]') as HTMLElement;
    await expect(getComputedStyle(toggleParent).display).toBe('flex');
  },
};
