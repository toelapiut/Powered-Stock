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
  const { ticker, name, stocks} = response;
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());
  const [isOpen, setIsOpen] = useState(true);

  const onChangeDates = (dates) => {
    console.log({dates});
    setStart(dates.start);
    setEnd(dates.end);
    onOpenCalendar();
  };

  const onOpenCalendar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <StockScreen
        isOpen={isOpen}
        onOpenCalendar={onOpenCalendar}
        name={name}
        ticker={ticker}
        start={start}
        end={end}
        stocks={stocks}
        onChangeDates={onChangeDates}
      />
    </div>
  );
};
