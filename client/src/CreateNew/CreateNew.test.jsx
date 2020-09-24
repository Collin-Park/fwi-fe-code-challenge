import React from 'react';
import renderer from 'react-test-renderer';
import CreateNew from './CreateNew';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

describe('yourModule', () => {
  const initialState = {
    pagination: { category: '', direction: '', size: 4, from: 0 },
  };
  const mockStore = configureStore();
  let store;
  store = mockStore(initialState);

  const component = renderer.create(
    <Provider store={store}>
      <CreateNew />
    </Provider>
  );
  const treeNode = component.toJSON();

  console.log(treeNode.children[1].children[0].children[0]);

  test('first child renders correctly"', () => {
    expect(treeNode.children[0]).toMatchInlineSnapshot(`
        <div
          className="hidden-nav"
        />
        `);
  });

  test('third child renders correctly"', () => {
    expect(treeNode.children[2]).toMatchInlineSnapshot(`
        <h1
          className="display-2 text-center d-none"
        />
        `);
  });

  test('form header says "Create a New Player" ', () => {
    expect(treeNode.children[1].children[0].children[0]).toMatch(
      `Create a New Player`
    );
  });
});
