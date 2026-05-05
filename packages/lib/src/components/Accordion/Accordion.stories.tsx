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
    children: <div>Accordion content goes here.</div>,
  },
  play: async ({ canvas, userEvent }) => {
    const toggle = canvas.getByRole('button', { name: /accordion icon/i });
    await expect(toggle).toBeVisible();
    await expect(canvas.getByText('Accordion Title')).toBeVisible();
    // Content should be collapsed by default
    const container = canvas.getByText('Accordion content goes here.');
    await expect(container).toBeInTheDocument();
    // Click to expand
    await userEvent.click(toggle);
    await expect(canvas.getByText('Accordion content goes here.')).toBeVisible();
  },
};

export const DefaultOpen: Story = {
  args: {
    title: 'Open Accordion',
    defaultOpen: true,
    children: <div>This content is visible by default.</div>,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Open Accordion')).toBeVisible();
    await expect(canvas.getByText('This content is visible by default.')).toBeVisible();
  },
};

export const WithSubtitle: Story = {
  args: {
    title: 'Main Title',
    subtitle: <span>Additional context for this section</span>,
    defaultOpen: true,
    children: <div>Content with subtitle above.</div>,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Main Title')).toBeVisible();
    await expect(canvas.getByText('Additional context for this section')).toBeVisible();
    await expect(canvas.getByText('Content with subtitle above.')).toBeVisible();
  },
};

export const WithCaretIcon: Story = {
  args: {
    title: 'Caret Style',
    caretIcon: AccordionCaretIcon.Caret,
    caretAlign: AccordionCaretAlign.Start,
    defaultOpen: true,
    children: <div>Uses Caret icon aligned to start.</div>,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Caret Style')).toBeVisible();
    await expect(canvas.getByText('Uses Caret icon aligned to start.')).toBeVisible();
  },
};

export const CssCheck: Story = {
  args: {
    title: 'CSS Check',
    defaultOpen: true,
    children: <div>Content</div>,
  },
  play: async ({ canvas }) => {
    const toggle = canvas.getByText('CSS Check').closest('div[role="button"]')!;
    // AccordionToggle uses display: flex
    await expect(getComputedStyle(toggle).display).toBe('flex');
  },
};
