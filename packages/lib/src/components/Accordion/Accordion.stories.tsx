import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, waitFor } from 'storybook/test';
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
    await expect(
      canvas.getByLabelText('Accordion icon'),
    ).toBeVisible();
  },
};

export const Open: Story = {
  args: {
    title: 'Open Accordion',
    defaultOpen: true,
    children: 'This content is visible because the accordion starts open.',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Open Accordion')).toBeVisible();
    const collapse = canvas.getByText(
      'This content is visible because the accordion starts open.',
    );
    await expect(collapse).toBeVisible();
  },
};

export const WithSubtitle: Story = {
  args: {
    title: 'Accordion With Subtitle',
    subtitle: 'This is a subtitle below the title',
    defaultOpen: true,
    children: 'Content inside the accordion.',
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByText('This is a subtitle below the title'),
    ).toBeVisible();
    await expect(
      canvas.getByText('Content inside the accordion.'),
    ).toBeVisible();
  },
};

export const Toggle: Story = {
  args: {
    title: 'Click to toggle',
    disableAnimations: true,
    children: 'Now you can see hidden content.',
  },
  play: async ({ canvas, userEvent }) => {
    const toggle = canvas.getByRole('button', { name: /accordion icon/i });
    // Initially closed: content container should have 0fr rows
    const container = canvas.getByText('Now you can see hidden content.');
    await expect(container.closest('[aria-expanded="false"]')).not.toBeNull();
    // Click to open
    await userEvent.click(toggle);
    await waitFor(() => {
      expect(container.closest('[aria-expanded="true"]')).not.toBeNull();
    });
  },
};
