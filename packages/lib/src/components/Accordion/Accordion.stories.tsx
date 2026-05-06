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
    children: <p>This is the accordion content that is hidden by default.</p>,
  },
  play: async ({ canvas, userEvent }) => {
    const toggle = canvas.getByRole('button', { name: /accordion icon/i });
    await expect(toggle).toBeVisible();
    await expect(canvas.getByText('Accordion Title')).toBeVisible();
    // Content should be collapsed by default
    const container = canvas.getByText('This is the accordion content that is hidden by default.');
    await expect(container).toBeInTheDocument();
    // Click to expand
    await userEvent.click(toggle);
    await expect(canvas.getByText('This is the accordion content that is hidden by default.')).toBeVisible();
  },
};

export const DefaultOpen: Story = {
  args: {
    title: 'Open Accordion',
    defaultOpen: true,
    children: <p>This content is visible by default.</p>,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('This content is visible by default.')).toBeVisible();
    await expect(canvas.getByText('Open Accordion')).toBeVisible();
  },
};

export const WithSubtitle: Story = {
  args: {
    title: 'Main Title',
    subtitle: <span>Subtitle text here</span>,
    defaultOpen: true,
    children: <p>Content with subtitle above.</p>,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Main Title')).toBeVisible();
    await expect(canvas.getByText('Subtitle text here')).toBeVisible();
    await expect(canvas.getByText('Content with subtitle above.')).toBeVisible();
  },
};

export const WithCaretIcon: Story = {
  args: {
    title: 'Caret Style',
    caretIcon: AccordionCaretIcon.Caret,
    caretAlign: AccordionCaretAlign.Start,
    defaultOpen: true,
    children: <p>Using caret icon aligned to start.</p>,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Caret Style')).toBeVisible();
    await expect(canvas.getByText('Using caret icon aligned to start.')).toBeVisible();
  },
};

export const CssCheck: Story = {
  args: {
    title: 'CSS Check',
    defaultOpen: true,
    children: <p>Checking CSS loads correctly.</p>,
  },
  play: async ({ canvas }) => {
    // AccordionToggle has role="button" and uses display: flex
    const toggleContainer = canvas.getByRole('button', { name: /accordion icon/i }).closest('[role="button"]')!;
    await expect(getComputedStyle(toggleContainer).display).toBe('flex');
  },
};
