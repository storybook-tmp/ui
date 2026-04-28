import preview from '#.storybook/preview';
import { expect } from 'storybook/test';
import Accordion, { AccordionCaretAlign, AccordionCaretIcon } from './index';

const meta = preview.meta({
  component: Accordion,
  tags: ['ai-generated'],
  parameters: {
    layout: 'padded',
  },
});

export default meta;

export const Default = meta.story({
  args: {
    title: 'Accordion Title',
    children: 'This is the accordion content that is hidden by default.',
  },
  play: async ({ canvas }) => {
    const toggle = canvas.getByRole('button', { name: /accordion icon/i });
    await expect(toggle).toBeVisible();
    await expect(canvas.getByText('Accordion Title')).toBeVisible();
  },
});

export const DefaultOpen = meta.story({
  args: {
    title: 'Open Accordion',
    defaultOpen: true,
    children: 'This content is visible by default.',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Open Accordion')).toBeVisible();
    await expect(canvas.getByText('This content is visible by default.')).toBeVisible();
  },
});

export const WithSubtitle = meta.story({
  args: {
    title: 'Task Details',
    subtitle: 'Last updated 2 hours ago',
    defaultOpen: true,
    children: 'Detailed content goes here.',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Task Details')).toBeVisible();
    await expect(canvas.getByText('Last updated 2 hours ago')).toBeVisible();
    await expect(canvas.getByText('Detailed content goes here.')).toBeVisible();
  },
});

export const WithCaretIcon = meta.story({
  args: {
    title: 'Caret Style',
    caretIcon: AccordionCaretIcon.Caret,
    caretAlign: AccordionCaretAlign.Start,
    defaultOpen: false,
    children: 'Content with caret-style icon.',
  },
  play: async ({ canvas, userEvent }) => {
    const toggle = canvas.getByRole('button', { name: /accordion icon/i });
    await expect(toggle).toBeVisible();
    await userEvent.click(toggle);
    await expect(canvas.getByText('Content with caret-style icon.')).toBeVisible();
  },
});

export const CssCheck = meta.story({
  args: {
    title: 'CSS Check',
    defaultOpen: true,
    children: 'Checking that global styles are applied.',
  },
  play: async ({ canvas }) => {
    const toggle = canvas.getByRole('button', { name: /accordion icon/i });
    // resetStyles sets box-sizing: border-box on all elements. Default is content-box.
    await expect(getComputedStyle(toggle).boxSizing).toBe('border-box');
  },
});
