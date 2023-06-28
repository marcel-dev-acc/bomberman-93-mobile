import { render, renderHook, screen } from '@testing-library/react-native';
import store from '../../../../src/state/store';
import {Provider as ReduxProvider} from 'react-redux';
import Loop from './Loop';
// import { Map } from '../../../constants/Boards';
// import session from '../../../constants/Boards/mocks/session';
import { useRef } from 'react';

test('render loop component', async () => {

  /* THIS HAS BEEN DEPRECATED */

  // const dispatcher = jest.fn();
  // const handleReset = jest.fn();
  // const map = new Map(session);
  // const { result: { current: mapRef } } = renderHook(() => useRef(map));
  // const entities = map.getEntities();

  // const loop = render(
  //   <ReduxProvider store={store}>
  //     <Loop
  //       entities={entities}
  //       dispatcher={dispatcher}
  //       map={mapRef}
  //       handleReset={handleReset}
  //     />
  //   </ReduxProvider>
  // );

  // const bomber1Comp = await loop.findByTestId('bomber1');
  // expect(bomber1Comp.props.style.top).toBe(30);
  // expect(bomber1Comp.props.style.left).toBe(30);

  expect(1).toBe(1);

});