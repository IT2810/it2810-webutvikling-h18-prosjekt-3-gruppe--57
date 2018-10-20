import React from "react";
import "react-native";
import renderer from "react-test-renderer";
import HomeScreen from "../HomeScreen";
import ShallowRenderer from 'react-test-renderer/shallow';

it('renders correctly', () => {
    const tree = renderer.create(<HomeScreen/>).toJSON();
    expect(tree).toMatchSnapshot();
});

it('Testing child amount inside a shallowRender.', ()=> {
    const renderer = new ShallowRenderer();
    renderer.render(<HomeScreen/>);
    const result = renderer.getRenderOutput();
    expect(result.props.children.length).toEqual(2);
});