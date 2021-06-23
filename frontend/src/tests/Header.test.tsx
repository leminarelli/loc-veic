import React from 'react';
import { Header } from './../components/Header';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';

configure({ adapter: new Adapter() });

it('should display an button to add car', () => {
    const wrapper = shallow(<Header />);
    expect(wrapper.find('button').length).toBe(1);
});
it('should display a img logo', () => {
    const wrapper = shallow(<Header />);
    expect(wrapper.find('img').length).toBe(1);
});