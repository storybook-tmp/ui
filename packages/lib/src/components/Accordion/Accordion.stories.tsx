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
    // Accordion starts closed by default, expand it
    await userEvent.click(toggle);
    const container = canvas.getByText('Accordion content goes here');
    await expect(container).toBeVisible();
  },
};

export const DefaultOpen: Story = {
  args: {
    title: 'Open Accordion',
    children: <div>Visible from the start</div>,
    defaultOpen: true,
  },
};

export const WithSubtitle: Story = {
  args: {
    title: 'Accordion with Subtitle',
    subtitle: <span>Subtitle text</span>,
    children: <div>Content under subtitle accordion</div>,
  },
};

export const CaretAlignStart: Story = {
  args: {
    title: 'Caret Aligned Start',
    caretAlign: AccordionCaretAlign.Start,
    children: <div>Caret aligned to start</div>,
  },
};

export const CaretIconCaret: Story = {
  args: {
    title: 'Caret Icon Style',
    caretIcon: AccordionCaretIcon.Caret,
    children: <div>Uses caret icon instead of chevron</div>,
  },
};
