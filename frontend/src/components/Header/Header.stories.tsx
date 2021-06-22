import { Story, Meta } from '@storybook/react/types-6-0'
import React from 'react'
import { Header } from './index'

export default {
	title: 'Components/Header',
	component: Header,
} as Meta

const Template: Story = () => <Header />

export const primaryButton: Story = Template.bind({})
primaryButton.args = {
	children: 'Primary' as any,
}
