import React, {Fragment, useEffect, useState} from 'react';
import Stock from '../containers/Stock';
import Market from '../components/Market';
import Brand from '../components/Brand';
import useSWR from 'swr';
import {url} from '../helper/url';
import {quandl} from '../helper/http';
import Error from '../screens/Error';
import {transpose, toCamelCase} from '../helper/utils';
import styles from './styles.module.css';
import Loading from '../components/Loading';

const fetcher = url => quandl.get(url).then(res => res.data);

export const App = () => {
  const {data, error} = useSWR(`${url.markets}`, fetcher);
  const [markets, setMarkets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState({});

  useEffect(() => {
    if (typeof data !== 'undefined') {
      const {datatable: {columns}} = data;
      let rows = data.datatable.data;
      let transposedData = toCamelCase(transpose(rows, columns));
      setActive(transposedData[0]);
      setMarkets(transposedData);
      setLoading(false);
    }
  }, [data]);

  const onActivateMarket = (ticker) => {
    setActive(ticker);
  };

  if (typeof error !== 'undefined')
    return <Error/>;

  if (loading)
    return (
      <div className={styles.loader}>
        <Loading/>
        <p className={styles.loading}>Initializing Markets ...</p>
      </div>
    );

  return (
    <Fragment>
      <div className={styles.container}>
        <div>
          <Brand/>
          <div className={styles.sidebar}>
            <ul className={styles.unordered}>
              {markets.map((market) =>
                <div className={`${styles.wrap} ${market.ticker === active.ticker ? styles.active : ''}`}
                  key={market.ticker}>
                  <li
                    className={`${styles.list}`}
                    onClick={() => onActivateMarket(market)}>
                    <Market
                      ticker={market.ticker}
                      companyName={market.compName}
                      fullCompanyName={market.compName2}
                      openingMargin={market.zacksOperMarginQ0}
                      totalRevenue={market.totRevenueF0}
                    />
                  </li>
                </div>
              )}
            </ul>
          </div>
        </div>
        <div>
          <Stock
            active={active}
          />
        </div>
      </div>
    </Fragment>
  );
};

