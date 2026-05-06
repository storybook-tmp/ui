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
    await waitFor(() => {
      expect(
        canvas.getByText('This is the accordion content that is hidden by default.'),
      ).toBeVisible();
    });
  },
};

export const DefaultOpen: Story = {
  args: {
    title: 'Open Accordion',
    defaultOpen: true,
    children: <p>This content is visible from the start.</p>,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Open Accordion')).toBeVisible();
    await expect(
      canvas.getByText('This content is visible from the start.'),
    ).toBeVisible();
  },
};

export const WithSubtitle: Story = {
  args: {
    title: 'Task Details',
    subtitle: <span>3 items</span>,
    defaultOpen: true,
    children: (
      <ul>
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
      </ul>
    ),
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Task Details')).toBeVisible();
    await expect(canvas.getByText('3 items')).toBeVisible();
    await expect(canvas.getByText('Item 1')).toBeVisible();
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
