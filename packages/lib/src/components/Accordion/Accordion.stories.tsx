import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import Accordion, { AccordionCaretAlign, AccordionCaretIcon } from '.';

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
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Accordion Title')).toBeVisible();
  },
};

export const DefaultOpen: Story = {
  args: {
    defaultOpen: true,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Accordion content goes here')).toBeVisible();
  },
};

export const WithSubtitle: Story = {
  args: {
    subtitle: <span>Subtitle text</span>,
  },
};

export const CaretAlignStart: Story = {
  args: {
    caretAlign: AccordionCaretAlign.Start,
  },
};

export const ChevronIcon: Story = {
  args: {
    caretIcon: AccordionCaretIcon.Caret,
  },
};

export const ToggleInteraction: Story = {
  play: async ({ canvas, userEvent }) => {
    const toggle = canvas.getByText('Accordion Title');
    await userEvent.click(toggle);
    await expect(canvas.getByText('Accordion content goes here')).toBeVisible();
    await userEvent.click(toggle);
  },
};
