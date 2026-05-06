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
  play: async ({ canvas, userEvent }) => {
    const toggle = canvas.getByRole('button', { name: /accordion icon/i });
    await expect(toggle).toBeVisible();
    await expect(canvas.getByText('Accordion Title')).toBeVisible();
    // Content should be collapsed by default
    const container = canvas.getByRole('button', { name: /accordion icon/i }).closest('div')!.parentElement!.querySelector('[aria-expanded]')!;
    await expect(container.getAttribute('aria-expanded')).toBe('false');
    // Click to expand
    await userEvent.click(toggle);
    await expect(container.getAttribute('aria-expanded')).toBe('true');
    await expect(canvas.getByText('Accordion content goes here')).toBeVisible();
  },
};

export const DefaultOpen: Story = {
  args: {
    title: 'Open Accordion',
    defaultOpen: true,
    children: <div>This content is visible by default</div>,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('This content is visible by default')).toBeVisible();
  },
};

export const WithSubtitle: Story = {
  args: {
    title: 'Accordion With Subtitle',
    subtitle: <span>This is a subtitle</span>,
    defaultOpen: true,
    children: <div>Content with subtitle</div>,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Accordion With Subtitle')).toBeVisible();
    await expect(canvas.getByText('This is a subtitle')).toBeVisible();
    await expect(canvas.getByText('Content with subtitle')).toBeVisible();
  },
};

export const CssCheck: Story = {
  args: {
    title: 'Styled Accordion',
    children: <div>Styled content</div>,
  },
  play: async ({ canvas }) => {
    // AccordionToggle uses display: flex - find it by text content parent
    const titleEl = canvas.getByText('Styled Accordion');
    const toggle = titleEl.parentElement!;
    await expect(getComputedStyle(toggle).display).toBe('flex');
  },
};

export const WithToggledTitle: Story = {
  args: {
    title: 'Collapsed Title',
    toggledTitle: 'Expanded Title',
    defaultOpen: false,
    children: <div>Toggled content</div>,
  },
  play: async ({ canvas, userEvent }) => {
    await expect(canvas.getByText('Collapsed Title')).toBeVisible();
    const toggle = canvas.getByRole('button', { name: /accordion icon/i });
    await userEvent.click(toggle);
    await expect(canvas.getByText('Expanded Title')).toBeVisible();
  },
};

export const CaretIcon: Story = {
  args: {
    title: 'With Caret Icon',
    caretIcon: AccordionCaretIcon.Caret,
    caretAlign: AccordionCaretAlign.Start,
    defaultOpen: true,
    children: <div>Caret icon variant content</div>,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('With Caret Icon')).toBeVisible();
    await expect(canvas.getByText('Caret icon variant content')).toBeVisible();
  },
};
