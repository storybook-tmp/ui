import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import styled from '@emotion/styled';
import { useState } from 'react';
import { TextInputWithGlyph } from './index';
import Icon from '../Icon';

const meta = {
  component: TextInputWithGlyph,
  title: 'Components/TextInputWithGlyph',
} satisfies Meta<typeof TextInputWithGlyph>;

export default meta;
type Story = StoryObj<typeof meta>;

const Container = styled.div`
  padding: 16px;
  max-width: 400px;
`;

export const Default: Story = {
  render: () => (
    <Container>
      <TextInputWithGlyph placeholder="Enter text..." />
    </Container>
  ),
  play: async (context) => {
    const canvas = context.canvas;
    const input = await canvas.findByRole('textbox');
    await expect(input).toBeVisible();
    await expect(input).toHaveAttribute('placeholder', 'Enter text...');
  },
};

export const WithIcon: Story = {
  render: () => (
    <Container>
      <TextInputWithGlyph
        placeholder="Search..."
        icon={<Icon glyph="MagnifyingGlass" size="small" />}
      />
    </Container>
  ),
  play: async (context) => {
    const canvas = context.canvas;
    const input = await canvas.findByRole('textbox');
    await expect(input).toBeVisible();
    const icons = canvas.getAllByRole('img');
    await expect(icons.length).toBeGreaterThan(0);
  },
};

export const WithPersistentPlaceholder: Story = {
  render: () => (
    <Container>
      <TextInputWithGlyph
        persistentPlaceholder="$"
        placeholder="Amount"
      />
    </Container>
  ),
  play: async (context) => {
    const canvas = context.canvas;
    const input = await canvas.findByRole('textbox');
    await expect(input).toBeVisible();
    const placeholder = canvas.getByText('$');
    await expect(placeholder).toBeVisible();
  },
};

export const WithIconAndPlaceholder: Story = {
  render: () => (
    <Container>
      <TextInputWithGlyph
        placeholder="Search projects..."
        persistentPlaceholder="🔍"
        icon={<Icon glyph="X" size="small" />}
      />
    </Container>
  ),
  play: async (context) => {
    const canvas = context.canvas;
    const input = await canvas.findByRole('textbox');
    await expect(input).toBeVisible();
    await expect(canvas.getByText('🔍')).toBeVisible();
  },
};

export const Interactive: Story = {
  render: () => {
    const [value, setValue] = useState('');

    return (
      <Container>
        <TextInputWithGlyph
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Type something..."
          icon={<Icon glyph="X" size="small" />}
        />
        <p style={{ marginTop: '16px' }}>Value: {value || '(empty)'}</p>
      </Container>
    );
  },
  play: async (context) => {
    const canvas = context.canvas;
    const userEvent = context.userEvent;

    const input = await canvas.findByRole('textbox');
    await expect(input).toBeVisible();

    await userEvent.type(input, 'Hello');
    await expect(canvas.getByText(/hello/i)).toBeVisible();
  },
};

export const Disabled: Story = {
  render: () => (
    <Container>
      <TextInputWithGlyph
        placeholder="Disabled input"
        disabled={true}
        icon={<Icon glyph="Lock" size="small" />}
      />
    </Container>
  ),
  play: async (context) => {
    const canvas = context.canvas;
    const input = await canvas.findByRole('textbox');
    await expect(input).toBeDisabled();
  },
};
