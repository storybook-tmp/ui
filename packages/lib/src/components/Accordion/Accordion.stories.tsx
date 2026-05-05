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
    children: <p>This is the accordion content that is shown when expanded.</p>,
  },
  play: async ({ canvas, userEvent }) => {
    const toggle = canvas.getByRole('button', { name: /accordion icon/i });
    await expect(toggle).toBeVisible();
    await expect(canvas.getByText('Accordion Title')).toBeVisible();
    // Click to expand
    await userEvent.click(toggle);
    await expect(canvas.getByText('This is the accordion content that is shown when expanded.')).toBeVisible();
  },
};

export const DefaultOpen: Story = {
  args: {
    title: 'Open Accordion',
    defaultOpen: true,
    children: <p>This content is visible by default.</p>,
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByText('This content is visible by default.'),
    ).toBeVisible();
  },
};

export const WithSubtitle: Story = {
  args: {
    title: 'Main Title',
    subtitle: <span>Subtitle description</span>,
    children: <p>Accordion body content</p>,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Main Title')).toBeVisible();
    await expect(canvas.getByText('Subtitle description')).toBeVisible();
  },
};

export const WithToggledTitle: Story = {
  args: {
    title: 'Collapsed Title',
    toggledTitle: 'Expanded Title',
    defaultOpen: false,
    children: <p>Content here</p>,
  },
  play: async ({ canvas, userEvent }) => {
    await expect(canvas.getByText('Collapsed Title')).toBeVisible();
    const toggle = canvas.getByRole('button', { name: /accordion icon/i });
    await userEvent.click(toggle);
    await expect(canvas.getByText('Expanded Title')).toBeVisible();
  },
};

export const CaretAlignStart: Story = {
  args: {
    title: 'Caret at Start',
    caretAlign: AccordionCaretAlign.Start,
    caretIcon: AccordionCaretIcon.Caret,
    children: <p>Content with caret icon aligned to start.</p>,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Caret at Start')).toBeVisible();
    await expect(
      canvas.getByRole('button', { name: /accordion icon/i }),
    ).toBeVisible();
  },
};

export const CssCheck: Story = {
  args: {
    title: 'Styled Accordion',
    children: <p>Content</p>,
  },
  play: async ({ canvas, canvasElement }) => {
    const toggle = canvasElement.querySelector('[data-cy="accordion-toggle"]');
    await expect(toggle).not.toBeNull();
    // AccordionToggle uses display: flex
    await expect(getComputedStyle(toggle!).display).toBe('flex');
  },
};
