import {createContext} from 'react';

type SelectedSectors = {
  checkedItems: Record<string, boolean>;
  setCheckedItems: (arg: Record<string, boolean>) => void;
  resetFilter: () => void;
}

export const SectorsContext = createContext<SelectedSectors>({
  checkedItems: {},
  setCheckedItems: () => { /**/ },
  resetFilter: () => { /**/ }
});
