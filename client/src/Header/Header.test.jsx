import React from 'react';
import renderer from 'react-test-renderer';
import Header from './Header';
import { BrowserRouter as Router } from 'react-router-dom';

describe('yourModule', () => {
  const component = renderer.create(
    <Router>
      <Header />
    </Router>
  );
  const treeNode = component.toJSON();
  const parentClass = treeNode?.props?.className;
  const h1Text = treeNode?.children[1]?.children[0];
  console.log(treeNode?.children[0].children.length);
  const firstChildsChildrenCount = treeNode?.children[0].children.length;

  test('Header has the class "header"', () => {
    expect(parentClass).toMatch('header');
  });

  test('Header has the text "FWI Poker Challenge"', () => {
    expect(h1Text).toMatch('FWI Poker Challenge');
  });

  test('Header has two images in the first child div', () => {
    expect(firstChildsChildrenCount).toBe(2);
  });
});
