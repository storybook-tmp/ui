import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import Accordion, { AccordionCaretAlign, AccordionCaretIcon } from './index';

const meta = {
  component: Accordion,
  tags: ['ai-generated'],
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Accordion Title',
    children: <p>Accordion content goes here.</p>,
  },
  play: async ({ canvas, userEvent }) => {
    const toggle = canvas.getByRole('button', { name: /accordion icon/i });
    await expect(toggle).toBeVisible();
    await userEvent.click(toggle);
    await expect(canvas.getByText('Accordion content goes here.')).toBeVisible();
  },
};

export const DefaultOpen: Story = {
  args: {
    title: 'Open by Default',
    defaultOpen: true,
    children: <p>This content is visible immediately.</p>,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('This content is visible immediately.')).toBeVisible();
  },
};

export const WithSubtitle: Story = {
  args: {
    title: 'Main Title',
    subtitle: <span>Subtitle text</span>,
    defaultOpen: true,
    children: <p>Content with subtitle.</p>,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Main Title')).toBeVisible();
    await expect(canvas.getByText('Subtitle text')).toBeVisible();
    await expect(canvas.getByText('Content with subtitle.')).toBeVisible();
  },
};

export const CssCheck: Story = {
  args: {
    title: 'Styled Accordion',
    defaultOpen: true,
    children: <p>Content</p>,
  },
  play: async ({ canvas }) => {
    const toggle = canvas.getByRole('button', { name: /accordion icon/i });
    // AccordionToggle uses display: flex
    const toggleParent = toggle.closest('[data-cy="accordion-toggle"]') as HTMLElement;
    await expect(getComputedStyle(toggleParent).display).toBe('flex');
  },
};
