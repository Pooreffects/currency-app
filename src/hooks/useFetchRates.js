import { useState, useEffect } from 'react';

const useFetchRates = (ratesUrl) => {
  /* Exchange Rates */
  const [exchangeRates, setExchangeRates] = useState([]);
  useEffect(() => {
    fetch(ratesUrl)
      .then((res) => res.json())
      .then((data) => {
        // to extract the rate only
        const arr = [
          ...Object.entries(data.rates).sort((a, b) =>
            a[0].localeCompare(b[0])
          ),
        ];
        const rates = arr.map((pair) => pair.pop());
        setExchangeRates(rates);
      });
  }, [ratesUrl]);

  return [exchangeRates];
};

export default useFetchRates;
