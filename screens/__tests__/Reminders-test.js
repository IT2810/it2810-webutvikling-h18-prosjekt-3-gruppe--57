import React from "react";
import "react-native";
import renderer from "react-test-renderer";
import Reminders from "../Reminders";
import ShallowRenderer from 'react-test-renderer/shallow';


it('renders correctly', () => {
    const tree = renderer.create(<Reminders/>).toJSON();
    expect(tree).toMatchSnapshot();
});

it('Testing child amount inside a shallowRender.', ()=> {
    const renderer = new ShallowRenderer();
    renderer.render(<Reminders/>);
    const result = renderer.getRenderOutput();
    expect(result.props.children.length).toEqual(3);
});