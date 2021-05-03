import React, {useEffect, useState} from 'react';
import StockScreen from '../../screens/StockScreen';
import useSWR from 'swr';
import {url} from '../../helper/url';
import {dateDiff, dateFormat, toCamelCase, transposeStock} from '../../helper/utils';
import {quandl} from '../../helper/http';
import PropTypes from 'prop-types';
import Snack from '../../components/Snack';


const fetcher = url => quandl.post(url).then(res => res.data);
const format = 'YYYY-MM-DD';
const now = dateFormat(new Date());
export const Stock = ({ticker, toastManager}) => {
  const {data, error} = useSWR(`${url.stocks}${ticker}`, fetcher);
  const [start, setStart] = useState(now);
  const [end, setEnd] = useState(now);
  const [date, setDate] = useState({start: now, end: now});
  const [isOpen, setIsOpen] = useState(true);
  const [stocks, setStocks] = useState([]);
  const [details, setDetails] = useState({ticker, name: ''});
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    if (typeof data !== 'undefined') {
      const datasets = toCamelCase(data);
      const {dataset} = datasets;
      const {datasetCode, name, endDate, startDate} = dataset;
      setStart(startDate);
      setEnd(endDate);
      setDate({start: startDate, end: endDate});
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
    let diff = dateDiff(dates.end, dates.start);
    if (!diff) return toaster();
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


  const toaster = () => {
    toastManager.add(Snack, {
      appearance: 'error',
      message: 'You need to select more than two months for a proper graph',
      autoDismiss: true,
    });
  };


  return (
    <div>
      <StockScreen
        error={error}
        loading={loading}
        date={date}
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
  ticker: PropTypes.string,
  toastManager: PropTypes.object,
};