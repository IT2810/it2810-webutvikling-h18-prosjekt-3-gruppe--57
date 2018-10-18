import React from "react";
import "react-native";
import renderer from "react-test-renderer";
import {shallow} from "enzyme"; 
import ModalNewReminder from "../ModalNewReminder";

it('renders correctly', () => {
    const tree = renderer.create(<ModalNewReminder/>).toJSON();
    expect(tree).toMatchSnapshot();
});

