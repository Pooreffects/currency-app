import { useState, useEffect } from 'react';

const useFetchCurrencyNames = (baseUrl) => {
  const [fromOptions, setFromOptions] = useState([]);
  const [toOptions, setToOptions] = useState([]);

  useEffect(() => {
    fetch(baseUrl)
      .then((res) => res.json())
      .then((data) => {
        setFromOptions([
          ...Object.keys(data).sort((a, b) => a[0].localeCompare(b[0])),
        ]);
        // full form
        setToOptions([...Object.values(data)]);
      });
  }, [baseUrl]);

  return [fromOptions, toOptions];
};

export default useFetchCurrencyNames;
