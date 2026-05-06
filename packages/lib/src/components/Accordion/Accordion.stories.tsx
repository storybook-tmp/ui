import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import Accordion, { AccordionCaretAlign, AccordionCaretIcon } from '.';

const meta = {
  component: Accordion,
  tags: ['ai-generated'],
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Accordion Title',
    children: <p>This is the accordion content. It can contain any elements.</p>,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Accordion Title')).toBeVisible();
    await expect(
      canvas.getByLabelText('Accordion icon'),
    ).toBeVisible();
  },
};

export const DefaultOpen: Story = {
  args: {
    title: 'Open Accordion',
    defaultOpen: true,
    children: <p>This content is visible by default.</p>,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Open Accordion')).toBeVisible();
    await expect(
      canvas.getByText('This content is visible by default.'),
    ).toBeVisible();
  },
};

export const WithSubtitle: Story = {
  args: {
    title: 'Accordion With Subtitle',
    subtitle: <span>Additional context below the title</span>,
    defaultOpen: true,
    children: <p>Main content area</p>,
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByText('Accordion With Subtitle'),
    ).toBeVisible();
    await expect(
      canvas.getByText('Additional context below the title'),
    ).toBeVisible();
  },
};

export const WithCaretIcon: Story = {
  args: {
    title: 'Caret Style',
    caretIcon: AccordionCaretIcon.Caret,
    caretAlign: AccordionCaretAlign.Start,
    defaultOpen: true,
    children: <p>Using caret icon instead of chevron</p>,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Caret Style')).toBeVisible();
    await expect(
      canvas.getByText('Using caret icon instead of chevron'),
    ).toBeVisible();
  },
};

export const Toggleable: Story = {
  args: {
    title: 'Click to Toggle',
    toggledTitle: 'Now Open!',
    children: <p>Toggled content is now visible.</p>,
  },
  play: async ({ canvas, userEvent }) => {
    await expect(canvas.getByText('Click to Toggle')).toBeVisible();
    await userEvent.click(canvas.getByRole('button', { name: 'Accordion icon' }));
    await expect(canvas.getByText('Now Open!')).toBeVisible();
    await expect(
      canvas.getByText('Toggled content is now visible.'),
    ).toBeVisible();
  },
};
