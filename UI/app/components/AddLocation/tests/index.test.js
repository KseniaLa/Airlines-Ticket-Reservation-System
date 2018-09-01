import React from 'react';
import { shallow } from 'enzyme';

import AddLocation from '../index';

describe('<AddLocation /> fieldsNotEmpty function', () => {
  const translations = [
    { value: 'city', language: 'ru' },
    { value: 'city', language: 'en' },
  ];
  const component = shallow(
    <AddLocation translations={translations} />,
  ).instance();

  it('should return true if there are no empty strings', () => {
    const fields = [
      { value: 'city', language: 'ru' },
      { value: 'city', language: 'en' },
    ];
    expect(component.fieldsNotEmpty(fields)).toEqual(true);
  });

  it('should return false if value property has empty string', () => {
    const fields = [
      { value: '', language: 'ru' },
      { value: 'city', language: 'en' },
    ];
    expect(component.fieldsNotEmpty(fields)).toEqual(false);
  });

  it('should return false if language property has empty string', () => {
    const fields = [
      { value: 'city', language: 'ru' },
      { value: 'city', language: '' },
    ];
    expect(component.fieldsNotEmpty(fields)).toEqual(false);
  });

  it('should return false if fields array is empty', () => {
    const fields = [];
    expect(component.fieldsNotEmpty(fields)).toEqual(false);
  });
});
