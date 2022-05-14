import React, { useState } from 'react';
import CurrencyHeader from './components/CurrencyHeader';
import FromCurrency from './components/FromCurrency';
import ToCurrency from './components/ToCurrency';
import logo from './logo.svg';
import { motion } from 'framer-motion';
import useFetch from './hooks/useFetch';

export default function App() {
  /* Fetched Data */
  const [exchangeRate] = useFetch('https://openexchangerates.org/api/');

  /* Amount Input Fields */
  const [amount, setAmount] = useState(1);
  const [amountFrom, setAmountFrom] = useState(true);

  let fromAmount, toAmount;
  if (amountFrom) {
    fromAmount = amount;
    toAmount = amount * exchangeRate;
  } else {
    toAmount = amount;
    fromAmount = amount / exchangeRate;
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
    <div className="app ">
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -100 }}
        transition={{ transition: 'easeOut', duration: 1 }}
        className="app-header p-5 text-center"
      >
        <img src={logo} className="App-logo" alt="logo" />
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ transition: 'easeOut', duration: 1, delay: 1 }}
        className="text-amber-300 font-primary font-semibold text-center text-2xl pt-6 "
      >
        Currency Exchange Converter
      </motion.h2>
      <motion.div
        initial={{ opacity: 0, y: +50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: +50 }}
        transition={{ transition: 'easeOut', duration: 1, delay: 1 }}
        className="lg:max-w-2xl p-4 border-2 mx-auto my-0 rounded-2xl  mt-10  h-max"
      >
        <CurrencyHeader toAmount={toAmount} fromAmount={fromAmount} />

        <FromCurrency
          amount={fromAmount}
          onAmountChange={handleFromAmountChange}
          handleFormSubmit={handleFormSubmit}
        />
        <div className="text-center text-slate-100 font-bold text-4xl"> = </div>
        <ToCurrency
          amount={toAmount}
          onAmountChange={handleToAmountChange}
          handleFormSubmit={handleFormSubmit}
        />
      </motion.div>
    </div>
  );
}
