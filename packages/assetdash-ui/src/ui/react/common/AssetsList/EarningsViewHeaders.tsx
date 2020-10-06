import {Th} from '../Table/Table';
import React from 'react';
import {Tooltip} from '../Tooltip';
import {ColumnHeaderText} from '../ColumnHeaderText';
import {TabHeadersProps} from '../../../../core/models/tabHeadersProps';

export const EarningsViewHeaders = ({getIconClassName, setAssetsSortForColumn}: TabHeadersProps) => (
  <>
    <Th
      data-testid='eps-column-header'
      className={getIconClassName('eps')}
      onClick={() => setAssetsSortForColumn('eps')}
    >
      <Tooltip
        text="Earnings Per Share measures the profitability of a company. Our leaderboard reflects TTM
                       EPS. TTM EPS is the EPS for the last 12 months of the company."
      >
        <ColumnHeaderText
          className={getIconClassName('eps')}
        >EPS</ColumnHeaderText>
      </Tooltip>
    </Th>
    <Th
      data-testid='earningsDate-column-header'
      className={getIconClassName('earningsDate')}
      onClick={() => setAssetsSortForColumn('earningsDate')}
    >
      <Tooltip
        text="Earnings Date is the next expected earnings report date for the company."
        isLast={true}
      >
        <ColumnHeaderText
          className={getIconClassName('earningsDate')}
        >Earnings Date</ColumnHeaderText>
      </Tooltip>
    </Th>
  </>
);
