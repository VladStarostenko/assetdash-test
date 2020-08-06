import {Matcher, MatcherOptions} from '@testing-library/dom/types/matches';
import {fireEvent, waitFor} from '@testing-library/react';
import {expect} from 'chai';

type AllByBoundAttributeOnContainer = (
  id: Matcher,
  options?: MatcherOptions,
) => HTMLElement[]

export async function waitForPageLoad(getAllByTestId: AllByBoundAttributeOnContainer) {
  await waitFor(() => expect(getAllByTestId('asset-row-name')).to.have.length(3));
}

export async function clickFirstSector(findAllByTestId: any) {
  const sector = (await findAllByTestId('sector-checkbox'))[0];
  const hiddenCheckbox = sector as HTMLInputElement;
  fireEvent.click(hiddenCheckbox);
}

export async function waitForNames(getAllByTestId: AllByBoundAttributeOnContainer, names: string[]) {
  await waitFor(() => expect((getAllByTestId('asset-row-name')).map(el => el.textContent))
    .to.deep.eq(names));
}
