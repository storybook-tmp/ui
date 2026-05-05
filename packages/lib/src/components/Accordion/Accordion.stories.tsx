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
  play: async ({ canvasElement }) => {
    const container = canvasElement.querySelector('[aria-expanded]');
    await expect(container).not.toBeNull();
    await expect(container).toHaveAttribute('aria-expanded', 'false');
  },
};

export const DefaultOpen: Story = {
  args: { defaultOpen: true },
};

export const WithSubtitle: Story = {
  args: { subtitle: <span>Subtitle text</span> },
};

export const CaretStart: Story = {
  args: { caretAlign: AccordionCaretAlign.Start },
};

export const CaretIcon: Story = {
  args: { caretIcon: AccordionCaretIcon.Caret },
};

export const Controlled: Story = {
  args: { open: true },
};

export const Toggle: Story = {
  play: async ({ canvasElement, userEvent }) => {
    const toggle = canvasElement.querySelector('[data-cy="accordion-toggle"]') as HTMLElement;
    await userEvent.click(toggle);
    const container = canvasElement.querySelector('[data-cy="accordion-collapse-container"]');
    await expect(container).toHaveAttribute('aria-expanded', 'true');
  },
};
