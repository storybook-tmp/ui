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
    title: 'Open by default',
    defaultOpen: true,
    children: <div>Already visible content</div>,
  },
};

export const WithSubtitle: Story = {
  args: {
    title: 'Main Title',
    subtitle: <span>Subtitle text</span>,
    children: <div>Content with subtitle</div>,
  },
};

export const CaretAlignStart: Story = {
  args: {
    title: 'Start-aligned caret',
    caretAlign: AccordionCaretAlign.Start,
    children: <div>Content</div>,
  },
};

export const CaretIcon: Story = {
  args: {
    title: 'Caret icon variant',
    caretIcon: AccordionCaretIcon.Caret,
    children: <div>Content</div>,
  },
};

export const WithToggledTitle: Story = {
  args: {
    title: 'Collapsed title',
    toggledTitle: 'Expanded title',
    defaultOpen: false,
    children: <div>Content</div>,
  },
};
