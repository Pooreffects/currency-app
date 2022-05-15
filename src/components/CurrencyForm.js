import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import CurrencyHeader from './CurrencyHeader';
import FromCurrency from './FromCurrency';
import ToCurrency from './ToCurrency';
import useFetchCurrencyNames from '../hooks/useFetchCurrencyNames';
import useFetchRates from '../hooks/useFetchRates';

export default function CurrencyForm() {
  const [fromOption, setFromOption] = useState();
  const [toOption, setToOption] = useState();
  /* Fetched Data */
  const [exchangeRates] = useFetchRates(
    `https://openexchangerates.org/api/latest.json?app_id=${process.env.REACT_APP_API_KEY}`
  );
  const [fromOptions, toOptions] = useFetchCurrencyNames(
    'https://openexchangerates.org/api/currencies.json'
  );

  useEffect(() => {
    setFromOption(fromOptions[0]);
    setToOption(toOptions[0]);
  }, [fromOptions, toOptions]);

  /* Amount Input Fields */
  const [amount, setAmount] = useState(1);
  const [amountFrom, setAmountFrom] = useState(true);

  let fromAmount, toAmount;
  if (amountFrom) {
    fromAmount = amount;
    toAmount = amount * exchangeRates;
  } else {
    toAmount = amount;
    fromAmount = amount / exchangeRates;
  }

  /* Handle the amount change on user input */
  function handleFromAmountChange(e) {
    const floatValue = parseFloat(e.target.value.toLocaleString('en'));
    setAmount(floatValue);
    setAmountFrom(true);
  }
  function handleToAmountChange(e) {
    const floatValue = parseFloat(e.target.value.toLocaleString('en'));
    setAmount(floatValue);
    setAmountFrom(false);
  }

  /* Form Submission */

  function handleFormSubmit(e) {
    e.preventDefault();
    return false;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: +50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: +50 }}
      transition={{ transition: 'easeOut', duration: 1, delay: 1 }}
      className="lg:max-w-2xl p-4 border-2 mx-auto my-0 rounded-2xl  mt-10  h-max"
    >
      <CurrencyHeader
        toAmount={toAmount}
        fromAmount={fromAmount}
        fromOption={fromOption}
        toOption={toOption}
      />

      <FromCurrency
        fromOption={fromOption}
        setFromOption={setFromOption}
        amount={fromAmount}
        onAmountChange={handleFromAmountChange}
        handleFormSubmit={handleFormSubmit}
      />
      <div className="text-center text-slate-100 font-bold text-4xl"> = </div>
      <ToCurrency
        toOption={toOption}
        setToOption={setToOption}
        amount={toAmount}
        onAmountChange={handleToAmountChange}
        handleFormSubmit={handleFormSubmit}
      />
    </motion.div>
  );
}
