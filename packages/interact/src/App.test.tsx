


import React from 'react'
import renderer from 'react-test-renderer'
import Link from 'antd/lib/typography/Link';
import { expect,test } from 'vitest';
import FilterInteractionMultiple from "./Views/ViewComponents/FilterControls/FilterInteractionMultiple";
import {GridView} from "./Views/GridView";

function toJson(component: renderer.ReactTestRenderer) {
    const result = component.toJSON()
    expect(result).toBeDefined()
    expect(result).not.toBeInstanceOf(Array)
    return result as renderer.ReactTestRendererJSON
}

test('Link changes the class when hovered', () => {
    const component = renderer.create(
        <GridView selectedView={1} />
    )
    
})
