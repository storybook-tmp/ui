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
    children: <p>This is the accordion content that is hidden by default.</p>,
  },
  play: async ({ canvas, userEvent }) => {
    const toggle = canvas.getByRole('button', { name: /accordion icon/i });
    await expect(toggle).toBeVisible();
    await expect(canvas.getByText('Accordion Title')).toBeVisible();
    // Content should be collapsed by default
    const container = canvas.getByText(
      'This is the accordion content that is hidden by default.',
    );
    await expect(container).toBeInTheDocument();
  },
};

export const DefaultOpen: Story = {
  args: {
    title: 'Open Accordion',
    defaultOpen: true,
    children: <p>This content is visible on mount.</p>,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('This content is visible on mount.')).toBeVisible();
    const collapse = canvas.getByLabelText('Accordion icon');
    await expect(collapse).toBeVisible();
  },
};

export const WithSubtitle: Story = {
  args: {
    title: 'Task Details',
    subtitle: <span>3 items</span>,
    children: <p>Detailed task information goes here.</p>,
    defaultOpen: true,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Task Details')).toBeVisible();
    await expect(canvas.getByText('3 items')).toBeVisible();
    await expect(
      canvas.getByText('Detailed task information goes here.'),
    ).toBeVisible();
  },
};

export const ToggleInteraction: Story = {
  args: {
    title: 'Click to expand',
    toggledTitle: 'Click to collapse',
    disableAnimations: true,
    children: <p>Toggled content</p>,
  },
  play: async ({ canvas, userEvent }) => {
    await expect(canvas.getByText('Click to expand')).toBeVisible();
    const toggle = canvas.getByRole('button', { name: /accordion icon/i });
    await userEvent.click(toggle);
    await expect(canvas.getByText('Click to collapse')).toBeVisible();
  },
};

export const CaretStart: Story = {
  args: {
    title: 'Caret at Start',
    caretAlign: AccordionCaretAlign.Start,
    caretIcon: AccordionCaretIcon.Caret,
    defaultOpen: true,
    children: <p>Content with caret aligned to start.</p>,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Caret at Start')).toBeVisible();
    await expect(
      canvas.getByText('Content with caret aligned to start.'),
    ).toBeVisible();
  },
};
