import {render} from '@testing-library/react';
import React from 'react';
import {MemoryRouter} from 'react-router-dom';
import {HomeWithRouter} from '../../src/ui/react/Home/HomeWithRouter';
import {ServiceContext} from '../../src/ui/react/hooks/useServices';
import {ThemeContextProvider} from '../../src/ui/react/Theme/ThemeContextProvider';
import {createTestServices} from '../helpers/testServices';

export function renderHome({pageNumber = 1, path = '/', services = createTestServices()} = {}) {
  const url = `${path}${pageNumber === 1 ? '' : '?p=' + pageNumber}`;
  return render(
    <ServiceContext.Provider value={services}>
      <ThemeContextProvider>
        <MemoryRouter initialEntries={[url]}>
          <HomeWithRouter/>
        </MemoryRouter>
      </ThemeContextProvider>
    </ServiceContext.Provider>);
}
