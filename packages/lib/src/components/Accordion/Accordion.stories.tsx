import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import styled from '@emotion/styled';
import Accordion from './index';

const meta = {
  component: Accordion,
  title: 'Components/Accordion',
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

const ContentContainer = styled.div`
  padding: 16px;
  background-color: #f5f5f5;
  border-radius: 4px;
`;

export const Closed: Story = {
  args: {
    title: 'Click to expand',
    children: 'This is the expanded content that appears when you click the accordion header.',
  },
  render: (args) => (
    <Accordion {...args}>
      <ContentContainer>
        <p>{args.children}</p>
      </ContentContainer>
    </Accordion>
  ),
  play: async (context) => {
    const canvas = context.canvas;
    const toggle = await canvas.findByRole('button', { name: /click to expand/i });
    await expect(toggle).toBeVisible();

    // Content should be hidden
    const content = canvas.getByText(/this is the expanded content/i);
    const accordion = content.closest('[data-cy="accordion-collapse-container"]');
    await expect(accordion).toHaveAttribute('aria-expanded', 'false');
  },
};

export const Open: Story = {
  args: {
    title: 'Click to collapse',
    defaultOpen: true,
    children: 'This content is displayed by default when the accordion is open.',
  },
  render: (args) => (
    <Accordion {...args}>
      <ContentContainer>
        <p>{args.children}</p>
      </ContentContainer>
    </Accordion>
  ),
  play: async (context) => {
    const canvas = context.canvas;
    // Content should be visible
    const content = canvas.getByText(/this content is displayed by default/i);
    const accordion = content.closest('[data-cy="accordion-collapse-container"]');
    await expect(accordion).toHaveAttribute('aria-expanded', 'true');
  },
};

export const WithSubtitle: Story = {
  args: {
    title: 'Main title',
    subtitle: 'This is a subtitle for context',
    defaultOpen: true,
    children: 'Content appears here below both title and subtitle.',
  },
  render: (args) => (
    <Accordion {...args}>
      <ContentContainer>
        <p>{args.children}</p>
      </ContentContainer>
    </Accordion>
  ),
  play: async (context) => {
    const canvas = context.canvas;
    await expect(canvas.getByText('Main title')).toBeVisible();
    await expect(canvas.getByText('This is a subtitle for context')).toBeVisible();
    await expect(canvas.getByText(/content appears here/i)).toBeVisible();
  },
};

export const WithToggle: Story = {
  args: {
    title: 'Toggle me',
    defaultOpen: false,
    disableAnimations: true,
    children: 'Click the title to toggle this content.',
  },
  render: (args) => (
    <Accordion {...args}>
      <ContentContainer>
        <p>{args.children}</p>
      </ContentContainer>
    </Accordion>
  ),
  play: async (context) => {
    const canvas = context.canvas;
    const userEvent = context.userEvent;

    const toggle = await canvas.findByRole('button', { name: /toggle me/i });

    // Initially closed
    let content = canvas.getByText(/click the title to toggle/i);
    let accordion = content.closest('[data-cy="accordion-collapse-container"]');
    await expect(accordion).toHaveAttribute('aria-expanded', 'false');

    // Click to open
    await userEvent.click(toggle);
    accordion = content.closest('[data-cy="accordion-collapse-container"]');
    await expect(accordion).toHaveAttribute('aria-expanded', 'true');

    // Click to close
    await userEvent.click(toggle);
    accordion = content.closest('[data-cy="accordion-collapse-container"]');
    await expect(accordion).toHaveAttribute('aria-expanded', 'false');
  },
};
