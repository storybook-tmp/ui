import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, waitFor } from 'storybook/test';
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
    children: <p>Accordion content goes here. This is some detailed information.</p>,
  },
  play: async ({ canvas, userEvent }) => {
    const toggle = canvas.getByRole('button', { name: /accordion icon/i });
    await expect(toggle).toBeVisible();
    await expect(canvas.getByText('Accordion Title')).toBeVisible();
    // Content should be collapsed by default
    const container = canvas.getByText('Accordion content goes here. This is some detailed information.');
    await expect(container).toBeInTheDocument();
    // Click to expand
    await userEvent.click(toggle);
    await expect(canvas.getByText('Accordion content goes here. This is some detailed information.')).toBeVisible();
  },
};

export const DefaultOpen: Story = {
  args: {
    title: 'Open Accordion',
    defaultOpen: true,
    children: <p>This accordion starts open.</p>,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('This accordion starts open.')).toBeVisible();
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

export const CssCheck: Story = {
  args: {
    title: 'Styled Accordion',
    children: <p>Content</p>,
  },
  play: async ({ canvas }) => {
    const toggle = canvas.getByRole('button', { name: /accordion icon/i });
    // AccordionToggle uses display: flex - proves emotion CSS loaded
    const toggleParent = toggle.closest('[data-cy="accordion-toggle"]') as HTMLElement;
    await expect(getComputedStyle(toggleParent).display).toBe('flex');
  },
};

export const CaretAlignStart: Story = {
  args: {
    title: 'Start-aligned Caret',
    caretAlign: AccordionCaretAlign.Start,
    caretIcon: AccordionCaretIcon.Caret,
    children: <p>Caret aligned to start.</p>,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Start-aligned Caret')).toBeVisible();
    const icon = canvas.getByRole('button', { name: /accordion icon/i });
    await expect(icon.style.alignSelf).toBe('start');
  },
};
