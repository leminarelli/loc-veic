import { Story, Meta } from '@storybook/react/types-6-0'
import React from 'react'
import { Header } from './index'
import { BrowserRouter } from 'react-router-dom'

export default {
	title: 'Components/Header',
	component: Header,
} as Meta

const Template: Story = (args) => (
	<BrowserRouter>
		<Header name={args.name} />
	</BrowserRouter>
)

export const HeaderItem: Story = Template.bind({})
HeaderItem.args = {
	name: 'Letícia' as string,
}
