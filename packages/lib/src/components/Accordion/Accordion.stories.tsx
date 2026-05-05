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
    const container = canvas.getByText('Accordion content goes here');
    await expect(container).toBeVisible();
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
    subtitle: <span>Subtitle text</span>,
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

export const CssCheck: Story = {
  args: {
    defaultOpen: true,
  },
  play: async ({ canvas }) => {
    const toggle = canvas.getByRole('button', { name: /accordion icon/i });
    // AccordionToggle uses display: flex — fails if emotion CSS did not load.
    const toggleParent = toggle.closest('[data-cy="accordion-toggle"]') as HTMLElement;
    await expect(getComputedStyle(toggleParent).display).toBe('flex');
  },
};
