import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {Table, Th} from '../common/Table/Table';
import {AssetItem} from './AssetItem';
import {ButtonTertiary} from '../common/Button/ButtonTertiary';
import {Tabs, TabsProps} from '../common/Tabs';
import {Container} from '../common/Container';
import {ButtonArrow} from '../common/Button/ButtonArrow';
import {ButtonsRow} from '../common/Button/ButtonsRow';
import {Tooltip} from '../common/Tooltip';
import {getPage} from '../../../integration/http/api';
import {Asset} from '../../../core/models/asset';
import {AssetResponse} from '../../../core/models/assetResponse';
import {sortByAssetName, sortByRank} from '../../../core/utils';

export const Assets = (props: TabsProps) => {
  const [pageData, setPageData] = useState<Asset[]>([]);
  const [isSortByAssetName, setIsSortByAssetName] = useState(0);
  const [isSortByRank, setIsSortByRank] = useState(0);

  useEffect(() => {
    getPage(1).then((res: AssetResponse) => {
      setPageData(res.data);
    });
  }, []);

  useEffect(() => {
    if (isSortByAssetName !== 0) {
      setPageData(sortByAssetName(pageData, isSortByAssetName));
    } else {
      setPageData(sortByRank(pageData, isSortByRank));
    }
  }, [isSortByAssetName, isSortByRank]);

  const onAssetNameClick = () => {
    if (isSortByAssetName === 0) {
      setIsSortByRank(0);
      setIsSortByAssetName(1);
    } else {
      setIsSortByAssetName(0 - isSortByAssetName);
    }
  };

  const onRankClick = () => {
    if (isSortByRank === 0) {
      setIsSortByAssetName(0);
      setIsSortByRank(1);
    } else {
      setIsSortByRank(0 - isSortByRank);
    }
  };

  return (
    <>
      <Container>
        <ButtonsRow>
          <Tabs {...props}/>
          <TableButtons>
            <ButtonArrow direction="right">
              Next 100
            </ButtonArrow>
            <ButtonTertiary>View all</ButtonTertiary>
          </TableButtons>
        </ButtonsRow>
      </Container>
      <AssetsView>
        <Table>
          <thead>
            <tr>
              <Th onClick={onRankClick}>Rank</Th>
              <Th>
                <Tooltip
                  text="Our leaderboard ranks assets by market capitalization. The Daily Dash tracks how many places
                      an asset has moved up or down in the leaderboard over the course of the day."
                  position="left"
                >
                  <p>Daily Dash</p>
                </Tooltip>
              </Th>
              <Th onClick={onAssetNameClick}>Asset Name</Th>
              <Th>Symbol</Th>
              <Th>Market Cap</Th>
              <Th>Price</Th>
              <Th>Today</Th>
              <Th>
                <Tooltip
                  text="Our leaderboard ranks assets by market capitalization. The Weekly Dash tracks how many places
                       an asset has moved up or down in the leaderboard over the course of the week."
                >
                  <p>Weekly Dash</p>
                </Tooltip>
              </Th>
              <Th>
                <Tooltip
                  text="Our leaderboard ranks assets by market capitalization. The Monthly Dash tracks how many places
                       an asset has moved up or down in the leaderboard over the course of the month."
                >
                  <p>Monthly Dash</p>
                </Tooltip>
              </Th>
              <Th></Th>
            </tr>
          </thead>
          <tbody>
            {pageData.map((asset, index) => <AssetItem key={asset.id} asset={asset}/>)}
          </tbody>
        </Table>
      </AssetsView>
    </>
  );
};

const AssetsView = styled.div`
  max-width: 1210px;
  width: 100%;
  padding: 0 20px;
  margin: 0 auto;
  overflow-x: scroll;
`;

const TableButtons = styled.div`
  display: flex;
  align-items: center;

  @media(max-width: 600px) {
    display: none;
  }
`;
