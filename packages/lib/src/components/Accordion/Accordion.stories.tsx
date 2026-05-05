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
  play: async ({ canvas, userEvent, canvasElement }) => {
    // The collapse container starts with aria-expanded="false"
    const collapseContainer = canvasElement.querySelector('[aria-expanded]') as HTMLElement;
    await expect(collapseContainer).toHaveAttribute('aria-expanded', 'false');
    // Click the toggle (div with role="button")
    await userEvent.click(canvas.getByRole('button', { name: /accordion icon/i }));
    await expect(collapseContainer).toHaveAttribute('aria-expanded', 'true');
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
    defaultOpen: true,
  },
};

export const CaretIcon: Story = {
  args: {
    caretIcon: AccordionCaretIcon.Caret,
    defaultOpen: true,
  },
};

export const CaretAlignStart: Story = {
  args: {
    caretAlign: AccordionCaretAlign.Start,
    defaultOpen: true,
  },
};

export const WithToggledTitle: Story = {
  args: {
    toggledTitle: 'Toggled Title',
    defaultOpen: true,
  },
};
