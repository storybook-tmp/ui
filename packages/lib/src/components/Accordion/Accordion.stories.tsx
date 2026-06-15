import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import Accordion, { AccordionCaretAlign, AccordionCaretIcon } from './index';

const meta = {
  title: 'AI Generated/Complex/Accordion',
  component: Accordion,
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Accordion Title',
    children: <p>This is the content inside the accordion.</p>,
  },
};

export const DefaultOpen: Story = {
  args: {
    title: 'Open by Default',
    defaultOpen: true,
    children: <p>This accordion starts open. Click to collapse it.</p>,
  },
};

export const WithSubtitle: Story = {
  args: {
    title: 'With Subtitle',
    subtitle: 'Additional context below the title',
    defaultOpen: true,
    children: <p>Content inside the accordion with a subtitle.</p>,
  },
};

export const CaretIcon: Story = {
  args: {
    title: 'Caret Icon Variant',
    caretIcon: AccordionCaretIcon.Caret,
    defaultOpen: false,
    children: <p>Uses a caret icon instead of the default chevron.</p>,
  },
};
