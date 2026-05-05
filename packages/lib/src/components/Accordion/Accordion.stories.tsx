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
    children: <p>This is the accordion content that is hidden by default.</p>,
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
    children: <p>This content is visible on load.</p>,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('This content is visible on load.')).toBeVisible();
  },
};

export const WithSubtitle: Story = {
  args: {
    title: 'Main Title',
    subtitle: <span>Additional subtitle info</span>,
    children: <p>Accordion body content</p>,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Main Title')).toBeVisible();
    await expect(canvas.getByText('Additional subtitle info')).toBeVisible();
  },
};

export const Toggleable: Story = {
  args: {
    title: 'Click to expand',
    disableAnimations: true,
    children: <p>Expanded content here</p>,
  },
  play: async ({ canvas, userEvent }) => {
    const toggle = canvas.getByRole('button', { name: /accordion icon/i });
    await userEvent.click(toggle);
    await expect(canvas.getByText('Expanded content here')).toBeVisible();
  },
};
