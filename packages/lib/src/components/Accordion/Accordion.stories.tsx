import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, waitFor } from 'storybook/test';
import Accordion, { AccordionCaretIcon } from './index';

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
    // Content should be hidden by default
    const container = canvas.getByText('Accordion content goes here');
    await expect(container).toBeInTheDocument();
  },
};

export const Open: Story = {
  args: {
    title: 'Open Accordion',
    defaultOpen: true,
    children: <div>This content is visible by default</div>,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Open Accordion')).toBeVisible();
    await expect(
      canvas.getByText('This content is visible by default'),
    ).toBeVisible();
  },
};

export const WithSubtitle: Story = {
  args: {
    title: 'Accordion With Subtitle',
    subtitle: <span>Additional info</span>,
    defaultOpen: true,
    caretIcon: AccordionCaretIcon.Caret,
    children: <div>Content with subtitle</div>,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Accordion With Subtitle')).toBeVisible();
    await expect(canvas.getByText('Additional info')).toBeVisible();
    await expect(canvas.getByText('Content with subtitle')).toBeVisible();
  },
};

export const CssCheck: Story = {
  args: {
    title: 'CSS Loaded',
    defaultOpen: true,
    children: <div>CSS check content</div>,
  },
  play: async ({ canvasElement }) => {
    const toggle = canvasElement.querySelector(
      '[data-cy="accordion-toggle"]',
    ) as HTMLElement;
    // AccordionToggle uses display:flex — fails if Emotion CSS did not load.
    await waitFor(() => {
      expect(getComputedStyle(toggle).display).toBe('flex');
    });
  },
};
