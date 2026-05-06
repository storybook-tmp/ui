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
    children: <div>Accordion content goes here</div>,
  },
  play: async ({ canvas, userEvent }) => {
    const toggle = canvas.getByRole('button', { name: /accordion icon/i });
    await expect(toggle).toBeVisible();
    await userEvent.click(toggle);
    const container = canvas.getByText('Accordion content goes here');
    await expect(container).toBeVisible();
  },
};

export const DefaultOpen: Story = {
  args: {
    title: 'Open by Default',
    children: <div>This content is visible</div>,
    defaultOpen: true,
  },
};

export const WithSubtitle: Story = {
  args: {
    title: 'Task Details',
    subtitle: <span>Additional info</span>,
    children: <div>Body content</div>,
  },
};

export const CaretStart: Story = {
  args: {
    title: 'Caret Start Aligned',
    children: <div>Content</div>,
    caretAlign: AccordionCaretAlign.Start,
    caretIcon: AccordionCaretIcon.Caret,
  },
};
