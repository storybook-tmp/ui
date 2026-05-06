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
  play: async ({ canvas, userEvent, canvasElement }) => {
    const toggle = canvas.getByRole('button', { name: /accordion icon/i });
    await userEvent.click(toggle);
    const expandedEl = canvasElement.querySelector('[aria-expanded="true"]');
    await expect(expandedEl).not.toBeNull();
  },
};

export const DefaultOpen: Story = {
  args: {
    title: 'Open by default',
    defaultOpen: true,
    children: <div>This content is visible immediately</div>,
  },
};

export const WithSubtitle: Story = {
  args: {
    title: 'With Subtitle',
    subtitle: <span>Additional info</span>,
    children: <div>Content under subtitle accordion</div>,
  },
};

export const CaretStart: Story = {
  args: {
    title: 'Caret at Start',
    caretAlign: AccordionCaretAlign.Start,
    caretIcon: AccordionCaretIcon.Caret,
    children: <div>Content with caret icon</div>,
  },
};
