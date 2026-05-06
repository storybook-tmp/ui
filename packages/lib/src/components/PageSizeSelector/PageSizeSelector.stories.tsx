import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import PageSizeSelector from '.';

const meta = {
  component: PageSizeSelector,
  tags: ['ai-generated'],
} satisfies Meta<typeof PageSizeSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 10,
    onChange: () => {},
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('10 / page')).toBeVisible();
  },
};

export const FiftyPerPage: Story = {
  args: {
    value: 50,
    onChange: () => {},
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('50 / page')).toBeVisible();
  },
};

export const Disabled: Story = {
  args: {
    value: 10,
    onChange: () => {},
    disabled: true,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('10 / page')).toBeVisible();
  },
};
