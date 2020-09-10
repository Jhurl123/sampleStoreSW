import React from 'react';
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import { mount, configure, shallow } from 'enzyme';
import AgeModal from '../ageModal'
import toJson from "enzyme-to-json";
import Adapter from 'enzyme-adapter-react-16';
 
configure({ adapter: new Adapter() });

let modalProps = {
  open: true,
  verifyAge: jest.fn(),
  setModalStatus: jest.fn()
}

describe('Age Modal Tests', () => {

  it('renders the UI without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<AgeModal {...modalProps} />, div);
    ReactDOM.unmountComponentAtNode(div);
  })
  
  it('renders the ui as expected', () => {
    const tree =  mount(<AgeModal {...modalProps} />)
    expect(toJson(tree)).toMatchSnapshot();  
  })

})