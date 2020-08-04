import {createContext} from 'react';

type SelectedSectors = {
  checkedItems: Record<string, boolean>;
  setCheckedItems: (arg: Record<string, boolean>) => void;
  resetFilter: () => void;
  isItemsChange: boolean;
  setIsItemsChange: (arg: boolean) => void;
}

export const SectorsContext = createContext<SelectedSectors>({
  checkedItems: {},
  setCheckedItems: () => { /**/ },
  resetFilter: () => { /**/ },
  isItemsChange: false,
  setIsItemsChange: () => { /**/ }
});
