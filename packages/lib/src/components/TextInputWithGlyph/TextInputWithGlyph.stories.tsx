import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import Icon from '@leafygreen-ui/icon';
import { TextInputWithGlyph } from './index';

const meta = {
  component: TextInputWithGlyph,
  tags: ['ai-generated'],
  args: {
    label: 'Search',
    placeholder: 'Enter a value...',
  },
} satisfies Meta<typeof TextInputWithGlyph>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas }) => {
    const input = canvas.getByLabelText('Search');
    await expect(input).toBeVisible();
    await expect(input).toHaveAttribute('placeholder', 'Enter a value...');
  },
};

export const WithIcon: Story = {
  args: {
    icon: <Icon glyph="MagnifyingGlass" />,
  },
  play: async ({ canvas }) => {
    const input = canvas.getByLabelText('Search');
    await expect(input).toBeVisible();
  },
};

export const WithTyping: Story = {
  args: {
    icon: <Icon glyph="MagnifyingGlass" />,
  },
  play: async ({ canvas, userEvent }) => {
    const input = canvas.getByLabelText('Search');
    await userEvent.type(input, 'test query');
    await expect(input).toHaveValue('test query');
  },
};
