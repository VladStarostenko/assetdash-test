import {Td} from '../Table/Table';
import {formatEarningsDate, formatEps} from '../../../../core/formatters';
import notFoundIcon from '../../../assets/icons/not-found-data.svg';
import React from 'react';

interface EarningsViewCellsProps {
  earningsDate: Date;
  eps: number;
}

export const EarningsViewCells = ({earningsDate, eps}: EarningsViewCellsProps) => (
  <>
    <Td>
      {eps
        ? formatEps(eps)
        : <img src={notFoundIcon}/>
      }
    </Td>
    <Td>
      {earningsDate
        ? formatEarningsDate(earningsDate)
        : <img src={notFoundIcon}/>
      }
    </Td>
  </>
);
