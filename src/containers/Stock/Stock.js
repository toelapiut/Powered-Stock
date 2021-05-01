import React, {useState} from 'react';
import StockScreen from '../../screens/StockScreen';

let response = {
  name: 'Apple Inc (AAPL) Prices, Dividends, Splits and Trading Volume',
  ticker: 'AAPL',
  start: '29 April, 1994',
  end: '29 April, 2003',
  stocks:[]
};
export const Stock = () => {
  const { ticker, name, stocks, start, end} = response;
  const [dates] = useState({start:start, end:end});
  const onChangeDates = () => {

  };

  return (
    <div>
      <StockScreen
        name={name}
        ticker={ticker}
        start={dates.start}
        end={dates.end}
        stocks={stocks}
        onChangeDates={onChangeDates}
      />
    </div>
  );
};
