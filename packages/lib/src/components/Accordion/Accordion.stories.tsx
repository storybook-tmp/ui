import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import Accordion, { AccordionCaretAlign, AccordionCaretIcon } from './index';

const meta = {
  component: Accordion,
  tags: ['ai-generated'],
  args: {
    title: 'Accordion Title',
    children: <div>Accordion content goes here</div>,
  },
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas, userEvent }) => {
    const toggle = canvas.getByRole('button', { name: /accordion icon/i });
    await expect(toggle).toBeVisible();
    await userEvent.click(toggle);
    await expect(canvas.getByText('Accordion content goes here')).toBeVisible();
  },
};

export const DefaultOpen: Story = {
  args: {
    defaultOpen: true,
  },
};

export const WithSubtitle: Story = {
  args: {
    defaultOpen: true,
    subtitle: <span>Some subtitle text</span>,
  },
};

export const CaretAlignStart: Story = {
  args: {
    caretAlign: AccordionCaretAlign.Start,
    defaultOpen: true,
  },
};

export const CaretIconCaret: Story = {
  args: {
    caretIcon: AccordionCaretIcon.Caret,
  },
};

export const WithToggledTitle: Story = {
  args: {
    defaultOpen: true,
    toggledTitle: 'Title when open',
  },
};
