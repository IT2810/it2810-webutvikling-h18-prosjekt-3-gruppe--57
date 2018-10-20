import React from "react";
import "react-native";
import renderer from "react-test-renderer";
import ModalInspectReminder from "../ModalInspectReminder";
import ShallowRenderer from 'react-test-renderer/shallow';
import { shallow } from 'enzyme';

it('renders correctly', () => {
    const tree = renderer.create(<ModalInspectReminder/>).toJSON();
    expect(tree).toMatchSnapshot();
});


it('Snapshot of shallowRender.', ()=> {
    const renderer = new ShallowRenderer();
    renderer.render(<ModalInspectReminder/>);
    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
});


