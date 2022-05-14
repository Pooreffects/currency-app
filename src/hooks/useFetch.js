import { useState, useEffect } from 'react';

const useFetch = ({ baseUrl, ratesUrl }) => {
  const [fromOptions, setFromOptions] = useState([]);
  const [fromOption, setFromOption] = useState();
  const [toOptions, setToOptions] = useState([]);
  const [toOption, setToOption] = useState();
  /* Exchange Rates */
  const [exchangeRate, setExchangeRate] = useState([]);

  useEffect(() => {
    fetch(baseUrl)
      .then((res) => res.json())
      .then((currencyNamesData) => {
        setFromOptions([
          ...Object.keys(currencyNamesData).sort((a, b) =>
            a[0].localeCompare(b[0])
          ),
        ]);
        setFromOption(fromOptions[0]);
        // full form
        setToOptions([...Object.values(currencyNamesData)]);
        setToOption(toOptions[0]);
      });
  }, [baseUrl, fromOptions, toOptions]);

  useEffect(() => {
    fetch(ratesUrl)
      .then((res) => res.json())
      .then((ratesData) => {
        // to extract the rate only
        const arr = [
          ...Object.entries(ratesData.rates).sort((a, b) =>
            a[0].localeCompare(b[0])
          ),
        ];
        const rates = arr.map((pair) => pair.pop());
        setExchangeRate(rates);
      });
  }, [ratesUrl]);

  return [
    fromOption,
    setFromOption,
    fromOptions,
    toOption,
    setToOption,
    toOptions,
    exchangeRate,
  ];
};

export default useFetch;
