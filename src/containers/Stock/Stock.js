import React, {useState, useEffect} from 'react';
import StockScreen from '../../screens/StockScreen';
import useSWR from 'swr';
import {url} from '../../helper/url';
import {toCamelCase, transposeStock, dateFormat} from '../../helper/utils';
import {quandl} from '../../helper/http';
import PropTypes from 'prop-types';
import {Error} from '../../screens/Error/Error';
import {Loading} from '../../components/Loading/Loading';

const fetcher = url => quandl.post(url).then(res => res.data);
const format = 'YYYY-MM-DD';

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

  const onChangeDates = async (dates) => {
    setStart(dates.start);
    setEnd(dates.end);
    onOpenCalendar();
    await fetchByDate(dates.start, dates.end);
    
  };

  const fetchByDate = async (startDate, endDate) => {
    setLoading(true);

    let response = await quandl.post(`${url.stocks}${ticker}`, {
      start: dateFormat(startDate, format),
      end: dateFormat(endDate, format)
    });

    let datasets = toCamelCase(response.data);
    const {dataset} = datasets;
    const {datasetCode, name} = dataset;
    setDetails({ticker: datasetCode, name});
    const transposed = transposeStock(dataset.data);
    setStocks(transposed);
    setLoading(false);
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