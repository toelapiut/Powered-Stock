import React, {useState, useEffect} from 'react';
import StockScreen from '../../screens/StockScreen';
import useSWR from 'swr';
import {url} from '../../helper/url';
import {toCamelCase} from '../../helper/utils';
import {transposeStock} from '../../helper/utils';
import {quandl} from '../../helper/http';
import PropTypes from 'prop-types';
import {Error} from '../../screens/Error/Error';
import {Loading} from '../../components/Loading/Loading';

const fetcher = url => quandl.post(url).then(res => res.data);

export const Stock = ({ticker}) => {
  const {data, error} = useSWR(`${url.stocks}${ticker}`, fetcher);
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());
  const [isOpen, setIsOpen] = useState(true);
  const [stocks, setStocks] = useState([]);
  const [details, setDetails] = useState({ticker, name: ''});
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    if (typeof data !== 'undefined') {
      const datasets = toCamelCase(data);
      const {dataset} = datasets;
      const {datasetCode, name} = dataset;
      setDetails({ticker: datasetCode, name});
      const transposed = transposeStock(dataset.data);
      setStocks(transposed);
      setLoading(false);
    }
  }, [data, ticker]);

  useEffect(() => {
    setLoading(false);
  }, [stocks]);

  useEffect(() => {
    setLoading(true);
  }, [ticker]);

  const onChangeDates = (dates) => {
    setStart(dates.start);
    setEnd(dates.end);
    onOpenCalendar();
  };

  const onOpenCalendar = () => {
    setIsOpen(!isOpen);
  };

  if (typeof error !== 'undefined') {
    return <Error/>;
  }

  if (loading) {
    return (
      <div>
        <Loading/>
      </div>
    );
  }
  return (
    <div>
      <StockScreen
        isOpen={isOpen}
        onOpenCalendar={onOpenCalendar}
        name={details.name}
        ticker={details.ticker}
        start={start}
        end={end}
        stocks={stocks}
        onChangeDates={onChangeDates}
      />
    </div>
  );
};

Stock.propTypes = {
  ticker: PropTypes.string
};