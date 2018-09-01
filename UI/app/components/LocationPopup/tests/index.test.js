import React from 'react';
import { shallow } from 'enzyme';
import Popup from 'reactjs-popup';
import LocationPopup from '../index';

describe('LocationPopup state management', () => {
  it('should change open-property', () => {
    const component = shallow(<LocationPopup />);
    expect(component.state('open')).toBe(false);
    component.find('button').simulate('click');
    expect(component.state('open')).toBe(true);
    component.find(Popup).simulate('close');
    expect(component.state('open')).toBe(false);
  });
});
