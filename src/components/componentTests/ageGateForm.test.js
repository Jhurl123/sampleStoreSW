import React from 'react';
import ReactDOM from 'react-dom'
import { mount, configure } from 'enzyme';
import AgeGateForm from '../ageGateForm'
import MockDate from 'mockdate'
import toJson from "enzyme-to-json";
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

MockDate.set(1434319925275);

let modalProps = {
  submitForm: jest.fn(),
  verifyDate: new Date(),
  handleDateChange: jest.fn(),
  selectedDate: new Date()
}

describe('Age Gate Form Tests', () => {

  it('renders the UI without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<AgeGateForm {...modalProps} />, div);
    ReactDOM.unmountComponentAtNode(div);
  })
  
  it('renders the ui as expected', () => {
    const tree =  mount(<AgeGateForm {...modalProps} />)
    expect(toJson(tree)).toMatchSnapshot();  
  })

  describe('Age Gate Form Submission', () => {

    it('calls the correct method when submitted', () => {
      const wrapper =  mount(<AgeGateForm {...modalProps} />)
      wrapper.find('form').simulate('submit');
      expect(modalProps.submitForm).toHaveBeenCalledTimes(1)
    })

  })

})