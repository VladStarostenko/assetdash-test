import {Th} from '../Table/Table';
import React from 'react';
import {Tooltip} from '../Tooltip';
import {ColumnHeaderText} from '../ColumnHeaderText';
import {TabHeadersProps} from '../../../../core/models/tabHeadersProps';

export const DashViewHeaders = ({getIconClassName, setAssetsSortForColumn}: TabHeadersProps) => (
  <>
    <Th
      data-testid='dashWeekly-column-header'
      className={getIconClassName('dashWeekly')}
      onClick={() => setAssetsSortForColumn('dashWeekly')}
    >
      <Tooltip
        text="Our leaderboard ranks assets by market capitalization. The Weekly Dash tracks how many places
                       an asset has moved up or down in the leaderboard over the course of the week."
      >
        <ColumnHeaderText
          className={getIconClassName('dashWeekly')}
        >Weekly Dash</ColumnHeaderText>
      </Tooltip>
    </Th>
    <Th
      data-testid='dashMonthly-column-header'
      className={getIconClassName('dashMonthly')}
      onClick={() => setAssetsSortForColumn('dashMonthly')}
    >
      <Tooltip
        text="Our leaderboard ranks assets by market capitalization. The Monthly Dash tracks how many places
                       an asset has moved up or down in the leaderboard over the course of the month."
      >
        <ColumnHeaderText
          className={getIconClassName('dashMonthly')}
        >Monthly Dash</ColumnHeaderText>
      </Tooltip>
    </Th>
  </>
);
