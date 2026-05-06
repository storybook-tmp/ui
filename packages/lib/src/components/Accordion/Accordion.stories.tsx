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
    // Starts collapsed — content container has aria-expanded="false"
    const collapse = canvas.getByLabelText('Accordion icon').closest('[aria-expanded]')?.parentElement?.querySelector('[aria-expanded]');
    // Click to expand
    await userEvent.click(toggle);
  },
};

export const DefaultOpen: Story = {
  args: { defaultOpen: true },
};

export const WithSubtitle: Story = {
  args: {
    subtitle: <span>Some subtitle text</span>,
    defaultOpen: true,
  },
};

export const CaretAlignStart: Story = {
  args: {
    caretAlign: AccordionCaretAlign.Start,
    defaultOpen: true,
  },
};

export const CaretIcon: Story = {
  args: {
    caretIcon: AccordionCaretIcon.Caret,
  },
};

export const WithToggledTitle: Story = {
  args: {
    defaultOpen: true,
    toggledTitle: 'Expanded Title',
  },
};
