import {Td} from '../../Table/Table';
import React from 'react';
import {Dash} from '../../Dash';

interface DashViewCellsProps {
  dashWeekly: number;
  dashMonthly: number;
}

export const DashViewCells = ({dashWeekly, dashMonthly}: DashViewCellsProps) => (
  <>
    <Td>
      <Dash direction={dashWeekly >= 0 ? 'up' : 'down'}>{dashWeekly}</Dash>
    </Td>
    <Td>
      <Dash direction={dashMonthly >= 0 ? 'up' : 'down'}>{dashMonthly}</Dash>
    </Td>
  </>
);
