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
  play: async ({ canvas, userEvent }) => {
    const toggle = canvas.getByRole('button', { name: /accordion icon/i });
    await userEvent.click(toggle);
    await expect(
      canvas.getByText('Accordion content goes here'),
    ).toBeVisible();
  },
};

export const DefaultOpen: Story = {
  args: {
    defaultOpen: true,
  },
};

export const WithSubtitle: Story = {
  args: {
    subtitle: <span>Subtitle text</span>,
  },
};

export const WithToggledTitle: Story = {
  args: {
    toggledTitle: 'Expanded Title',
    defaultOpen: true,
  },
};

export const CaretIcon: Story = {
  args: {
    caretIcon: AccordionCaretIcon.Caret,
  },
};

export const CssCheck: Story = {
  args: {
    defaultOpen: true,
  },
  play: async ({ canvasElement }) => {
    const toggle = canvasElement.querySelector('[data-cy="accordion-toggle"]');
    // resetStyles sets box-sizing: border-box on all elements — fails if global CSS did not load.
    await expect(getComputedStyle(toggle!).boxSizing).toBe('border-box');
  },
};
