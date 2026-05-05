import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import Accordion from './index';

const meta = {
  component: Accordion,
  tags: ['ai-generated'],
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Collapsed: Story = {
  args: {
    title: 'Section Title',
    children: 'This is the accordion content that is initially hidden.',
  },
  play: async ({ canvas, canvasElement }) => {
    await expect(canvas.getByText('Section Title')).toBeVisible();
    const container = canvasElement.querySelector('[data-cy="accordion-collapse-container"]');
    await expect(container).toHaveAttribute('aria-expanded', 'false');
  },
};

export const Expanded: Story = {
  args: {
    title: 'Expanded Section',
    defaultOpen: true,
    children: 'This content is visible by default.',
  },
  play: async ({ canvas, canvasElement }) => {
    await expect(canvas.getByText('Expanded Section')).toBeVisible();
    const container = canvasElement.querySelector('[data-cy="accordion-collapse-container"]');
    await expect(container).toHaveAttribute('aria-expanded', 'true');
  },
};

export const WithSubtitle: Story = {
  args: {
    title: 'Main Title',
    subtitle: 'Additional context about this section',
    defaultOpen: true,
    children: 'Content with subtitle.',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Main Title')).toBeVisible();
    await expect(
      canvas.getByText('Additional context about this section'),
    ).toBeVisible();
  },
};

export const Interactive: Story = {
  args: {
    title: 'Click to expand',
    children: 'Now you can see me!',
    disableAnimations: true,
  },
  play: async ({ canvas, canvasElement, userEvent }) => {
    const container = canvasElement.querySelector('[data-cy="accordion-collapse-container"]');
    await expect(container).toHaveAttribute('aria-expanded', 'false');
    const toggle = canvasElement.querySelector('[data-cy="accordion-toggle"]')!;
    await userEvent.click(toggle);
    await expect(container).toHaveAttribute('aria-expanded', 'true');
  },
};
