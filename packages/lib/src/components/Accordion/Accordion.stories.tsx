import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import Accordion from './index';

const meta = {
  component: Accordion,
  tags: ['ai-generated'],
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Accordion Title',
    children: 'This is the accordion content that is hidden by default.',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Accordion Title')).toBeVisible();
    await expect(canvas.getByLabelText('Accordion icon')).toBeVisible();
  },
};

export const DefaultOpen: Story = {
  args: {
    title: 'Open Accordion',
    defaultOpen: true,
    children: 'This content is visible because the accordion starts open.',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Open Accordion')).toBeVisible();
    await expect(
      canvas.getByText('This content is visible because the accordion starts open.'),
    ).toBeVisible();
  },
};

export const WithToggle: Story = {
  args: {
    title: 'Click to expand',
    children: 'Expanded content here.',
  },
  play: async ({ canvas, userEvent }) => {
    const toggle = canvas.getByRole('button', { name: /accordion/i });
    await expect(toggle).toBeVisible();
    await userEvent.click(toggle);
    await expect(canvas.getByText('Expanded content here.')).toBeVisible();
  },
};
