import preview from '#.storybook/preview';
import { expect } from 'storybook/test';
import Icon from '../Icon';
import { TextInputWithGlyph } from './index';

const meta = preview.meta({
  component: TextInputWithGlyph,
  tags: ['ai-generated'],
  parameters: {
    layout: 'centered',
  },
});

export default meta;

export const Default = meta.story({
  args: {
    label: 'Search',
    placeholder: 'Type to search...',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByLabelText('Search')).toBeVisible();
  },
});

export const WithIcon = meta.story({
  render: () => (
    <TextInputWithGlyph
      icon={<Icon glyph="MagnifyingGlass" />}
      label="Search"
      placeholder="Search tasks..."
    />
  ),
  play: async ({ canvas }) => {
    const input = canvas.getByLabelText('Search');
    await expect(input).toBeVisible();
    await expect(input).toHaveAttribute('placeholder', 'Search tasks...');
  },
});

export const WithPersistentPlaceholder = meta.story({
  render: () => (
    <TextInputWithGlyph
      label="Duration"
      persistentPlaceholder={<span>hh:mm:ss</span>}
    />
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByLabelText('Duration')).toBeVisible();
    await expect(canvas.getByText('hh:mm:ss')).toBeVisible();
  },
});

export const WithTyping = meta.story({
  args: {
    label: 'Username',
    placeholder: 'Enter username',
  },
  play: async ({ canvas, userEvent }) => {
    const input = canvas.getByLabelText('Username');
    await userEvent.type(input, 'admin.user');
    await expect(input).toHaveValue('admin.user');
  },
});
