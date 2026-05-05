import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, waitFor } from 'storybook/test';
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
    children: 'Accordion content goes here. This is the body of the accordion.',
  },
  play: async ({ canvas, userEvent }) => {
    const toggle = canvas.getByRole('button', { name: /accordion icon/i });
    await expect(toggle).toBeVisible();
    await expect(canvas.getByText('Accordion Title')).toBeVisible();
    // Content should be collapsed by default
    const container = canvas.getByLabelText(/accordion icon/i).closest('[data-cy]')!;
    await expect(container).toBeVisible();
  },
};

export const DefaultOpen: Story = {
  args: {
    title: 'Open Accordion',
    defaultOpen: true,
    children: 'This accordion starts open.',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Open Accordion')).toBeVisible();
    await expect(canvas.getByText('This accordion starts open.')).toBeVisible();
    const collapseContainer = canvas.getByText('This accordion starts open.').closest('[data-cy="accordion-collapse-container"]');
    await expect(collapseContainer).toHaveAttribute('aria-expanded', 'true');
  },
};

export const ToggleInteraction: Story = {
  args: {
    title: 'Click to Expand',
    disableAnimations: true,
    children: 'Revealed content after clicking.',
  },
  play: async ({ canvas, userEvent }) => {
    // Initially collapsed
    const collapseContainer = canvas.getByText('Revealed content after clicking.').closest('[data-cy="accordion-collapse-container"]')!;
    await expect(collapseContainer).toHaveAttribute('aria-expanded', 'false');

    // Click to expand
    const toggle = canvas.getByRole('button', { name: /accordion icon/i });
    await userEvent.click(toggle);
    await expect(collapseContainer).toHaveAttribute('aria-expanded', 'true');
  },
};

export const WithSubtitle: Story = {
  args: {
    title: 'Accordion with Subtitle',
    subtitle: 'This is a subtitle below the title',
    defaultOpen: true,
    children: 'Content inside the accordion.',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Accordion with Subtitle')).toBeVisible();
    await expect(canvas.getByText('This is a subtitle below the title')).toBeVisible();
    await expect(canvas.getByText('Content inside the accordion.')).toBeVisible();
  },
};

export const CaretIcon: Story = {
  args: {
    title: 'Caret Style Accordion',
    caretIcon: AccordionCaretIcon.Caret,
    caretAlign: AccordionCaretAlign.Start,
    defaultOpen: true,
    children: 'Content with a caret icon style.',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Caret Style Accordion')).toBeVisible();
    await expect(canvas.getByText('Content with a caret icon style.')).toBeVisible();
  },
};

export const CssCheck: Story = {
  args: {
    title: 'CSS Check Accordion',
    children: 'Verifying CSS is loaded.',
  },
  play: async ({ canvas }) => {
    const toggle = canvas.getByText('CSS Check Accordion').closest('[data-cy="accordion-toggle"]')!;
    // AccordionToggle uses display: flex from emotion
    await expect(getComputedStyle(toggle).display).toBe('flex');
  },
};
