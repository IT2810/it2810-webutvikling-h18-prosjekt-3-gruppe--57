import React from "react";
import "react-native";
import renderer from "react-test-renderer";
import Completed from "../Completed";
import ShallowRenderer from 'react-test-renderer/shallow';


it('Snapshot of shallowRender.', ()=> {
    const renderer = new ShallowRenderer();
    renderer.render(<Completed/>);
    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
});
