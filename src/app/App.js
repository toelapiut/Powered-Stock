// eslint-disable-next-line no-unused-vars
import React, {useEffect, useState} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Stock from '../containers/Stock';
import Market from '../components/Market';
import Brand from '../components/Brand';

// import useSWR from 'swr';
// import {url} from '../helper/url';
import {quandl} from '../helper/http';
// import Error from '../screens/Error';
import {transpose, toCamelCase} from '../helper/utils';
import styles from './styles.module.css';
import dataset from '../data.json';

let columns = dataset.columns;
let rows = dataset.data;

let transposed = toCamelCase(transpose(rows, columns));

// const fetcher = url => quandl.get(url).then(res => res.data);

export const App = () => {
  console.log({quandl, url: process.env.REACT_APP_BASE_URL});
  // const {data, error} = useSWR(`${url.markets}/ZACKS/CP?`, fetcher);
  // eslint-disable-next-line no-unused-vars
  const [markets, setMarkets] = useState(transposed);
  const [active, setActive] = useState('AAPL');


  // if (typeof error !== 'undefined')
  //   return <Error/>;

  // useEffect(() => {
  //   if (typeof data !== 'undefined') {
  //     let columns = data.datatable.columns;
  //     let rows = data.datatable.data;
  //     let transposedData = transpose(rows, columns);
  //     setMarkets(toCamelCase(transposedData));
  //   }
  // }, [data]);

  console.log({markets});

  const onActivateMarket = (ticker) => {
    setActive(ticker);
  };

  return (
    <Router>
      <div className={styles.container}>
        <div>
          <Brand/>
          <div className={styles.sidebar}>
            <ul className={styles.unordered}>
              {markets.map(({ticker, compName, compName2, zacksOperMarginQ0, totRevenueF0}) =>
                <div className={`${styles.wrap} ${ticker === active ? styles.active : ''}`} key={ticker}>
                  <li
                    className={`${styles.list}`}
                    onClick={() => onActivateMarket(ticker)}>
                    <Market
                      ticker={ticker}
                      companyName={compName}
                      fullCompanyName={compName2}
                      openingMargin={zacksOperMarginQ0}
                      totalRevenue={totRevenueF0}
                    />
                  </li>
                </div>
              )}
            </ul>
          </div>
        </div>
        <div>
          <Switch>
            <Route exact path="*">
              <Stock
                active={active}
              />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
};

