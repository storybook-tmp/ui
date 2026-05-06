import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import Accordion, { AccordionCaretAlign, AccordionCaretIcon } from './index';

const meta = {
  component: Accordion,
  tags: ['ai-generated'],
  args: {
    title: 'Accordion Title',
    children: <div>Accordion content goes here.</div>,
  },
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('button', { name: /accordion icon/i }),
    ).toBeVisible();
    await expect(
      canvas.getByText('Accordion Title'),
    ).toBeVisible();
  },
};

export const DefaultOpen: Story = {
  args: {
    defaultOpen: true,
  },
  play: async ({ canvasElement }) => {
    const collapseContainer = canvasElement.querySelector('[data-cy="accordion-collapse-container"]');
    await expect(collapseContainer).toHaveAttribute('aria-expanded', 'true');
  },
};

export const WithSubtitle: Story = {
  args: {
    subtitle: <span>This is a subtitle</span>,
    defaultOpen: true,
  },
};

export const CaretStart: Story = {
  args: {
    caretAlign: AccordionCaretAlign.Start,
  },
};

export const CaretIcon: Story = {
  args: {
    caretIcon: AccordionCaretIcon.Caret,
  },
};

export const ToggleInteraction: Story = {
  play: async ({ canvas, userEvent }) => {
    const toggle = canvas.getByRole('button', { name: /accordion icon/i });
    await userEvent.click(toggle);
    await expect(canvas.getByText('Accordion content goes here.')).toBeVisible();
  },
};
