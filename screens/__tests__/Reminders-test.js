import React from "react";
import "react-native";
import renderer from "react-test-renderer";
import Reminders from "../Reminders";

it('renders correctly', () => {
    const tree = renderer.create(<Reminders/>).toJSON();
    expect(tree).toMatchSnapshot();
});

