import React from "react";
import "react-native";
import renderer from "react-test-renderer";
import {shallow} from "enzyme"; 
import ModalNewReminder from "../ModalNewReminder";
import ShallowRenderer from 'react-test-renderer/shallow';

it('renders correctly', () => {
    const tree = renderer.create(<ModalNewReminder/>).toJSON();
    expect(tree).toMatchSnapshot();
});

/*it('Snapshot of shallowRender.', ()=> {
    let props = {
        currentDay: new Date("2017-09-15 09:30:00")
    };
    const renderer = new ShallowRenderer();
    renderer.render(<ModalNewReminder {...props}/>);
    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
});*/
