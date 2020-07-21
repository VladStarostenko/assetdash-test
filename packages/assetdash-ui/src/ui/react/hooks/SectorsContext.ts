import {createContext} from 'react';
import {CheckBox} from '../common/Sort/Sort';

export const SectorsContext = createContext<CheckBox | any>({} as CheckBox);
