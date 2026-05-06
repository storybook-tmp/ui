import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, waitFor } from 'storybook/test';
import Accordion, { AccordionCaretAlign, AccordionCaretIcon } from './index';

const meta = {
  component: Accordion,
  tags: ['ai-generated'],
  args: {
    title: 'Accordion Title',
    children: <div>Accordion content goes here. This is the collapsible body.</div>,
  },
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    defaultOpen: false,
  },
  play: async ({ canvas, userEvent }) => {
    const toggle = canvas.getByRole('button', { name: /accordion icon/i });
    await expect(toggle).toBeVisible();
    await expect(canvas.getByText('Accordion Title')).toBeVisible();
  },
};

export const Open: Story = {
  args: {
    defaultOpen: true,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Accordion Title')).toBeVisible();
    await expect(
      canvas.getByText('Accordion content goes here. This is the collapsible body.'),
    ).toBeVisible();
  },
};

export const ToggleInteraction: Story = {
  args: {
    defaultOpen: false,
    disableAnimations: true,
  },
  play: async ({ canvas, userEvent }) => {
    // Initially content should be collapsed
    const toggle = canvas.getByRole('button', { name: /accordion icon/i });
    await userEvent.click(toggle);

    // After clicking, content should be visible
    await waitFor(() =>
      expect(
        canvas.getByText('Accordion content goes here. This is the collapsible body.'),
      ).toBeVisible(),
    );
  },
};

export const WithSubtitle: Story = {
  args: {
    defaultOpen: true,
    subtitle: <span>This is a subtitle</span>,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('This is a subtitle')).toBeVisible();
    await expect(canvas.getByText('Accordion Title')).toBeVisible();
  },
};

export const CaretIcon: Story = {
  args: {
    defaultOpen: true,
    caretIcon: AccordionCaretIcon.Caret,
    caretAlign: AccordionCaretAlign.Start,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Accordion Title')).toBeVisible();
    await expect(
      canvas.getByText('Accordion content goes here. This is the collapsible body.'),
    ).toBeVisible();
  },
};
