import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, waitFor } from 'storybook/test';
import Accordion, { AccordionCaretAlign, AccordionCaretIcon } from './index';

const meta = {
  component: Accordion,
  tags: ['ai-generated'],
  args: {
    title: 'Accordion Title',
    children: <div>Accordion content goes here with some details about the item.</div>,
  },
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Accordion Title')).toBeVisible();
    await expect(canvas.getByLabelText('Accordion icon')).toBeVisible();
  },
};

export const DefaultOpen: Story = {
  args: {
    defaultOpen: true,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Accordion Title')).toBeVisible();
    await expect(canvas.getByText('Accordion content goes here with some details about the item.')).toBeVisible();
  },
};

export const WithSubtitle: Story = {
  args: {
    defaultOpen: true,
    subtitle: <span>This is a subtitle</span>,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('This is a subtitle')).toBeVisible();
    await expect(canvas.getByText('Accordion content goes here with some details about the item.')).toBeVisible();
  },
};

export const WithToggledTitle: Story = {
  args: {
    defaultOpen: true,
    toggledTitle: 'Expanded Title',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Expanded Title')).toBeVisible();
  },
};

export const CaretAlignStart: Story = {
  args: {
    caretAlign: AccordionCaretAlign.Start,
    caretIcon: AccordionCaretIcon.Caret,
    defaultOpen: true,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Accordion Title')).toBeVisible();
  },
};

export const ToggleInteraction: Story = {
  args: {
    disableAnimations: true,
  },
  play: async ({ canvas, userEvent }) => {
    const titleEl = canvas.getByText('Accordion Title');
    await userEvent.click(titleEl);
    await expect(canvas.getByText('Accordion content goes here with some details about the item.')).toBeVisible();
  },
};

export const CssCheck: Story = {
  args: {
    defaultOpen: true,
  },
  play: async ({ canvas }) => {
    const titleEl = canvas.getByText('Accordion Title');
    const toggleContainer = titleEl.closest('[data-cy="accordion-toggle"]')!;
    await expect(getComputedStyle(toggleContainer).display).toBe('flex');
  },
};
