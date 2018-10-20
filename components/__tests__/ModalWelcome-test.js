import React from "react";
import "react-native";
import renderer from "react-test-renderer";
import ShallowRenderer from 'react-test-renderer/shallow';
import ModalWelcome from "../ModalWelcome";

it('renders correctly', () => {
    const tree = renderer.create(<ModalWelcome/>).toJSON();
    expect(tree).toMatchSnapshot();
});

