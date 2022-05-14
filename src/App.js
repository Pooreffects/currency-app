import React, { useEffect, useState } from 'react';
import CurrencyHeader from './components/CurrencyHeader';
import FromCurrency from './components/FromCurrency';
import ToCurrency from './components/ToCurrency';
import logo from './logo.svg';
import { motion } from 'framer-motion';

function App() {
  /* Select Options */
  const [fromOptions, setFromOptions] = useState([]);
  const [fromOption, setFromOption] = useState();
  const [toOptions, setToOptions] = useState([]);
  const [toOption, setToOption] = useState();

  /* Amount Input Fields */
  const [amount, setAmount] = useState(1);
  const [amountFrom, setAmountFrom] = useState(true);

  /* Exchange Rates */
  const [exchangeRate, setExchangeRate] = useState([]);

  /* Fetch Currencies names */
  useEffect(() => {
    fetch('https://openexchangerates.org/api/currencies.json')
      .then((res) => res.json())
      .then((data) => {
        setFromOptions([
          ...Object.keys(data).sort((a, b) => a[0].localeCompare(b[0])),
        ]);
        setFromOption(fromOptions[0]);
        setToOptions([...Object.values(data)]);
        setToOption(toOptions[0]);
      });
    fetch(
      `https://openexchangerates.org/api/latest.json?app_id=${process.env.REACT_APP_API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => {
        // to extract the rate only
        const arr = [
          ...Object.entries(data.rates).sort((a, b) =>
            a[0].localeCompare(b[0])
          ),
        ];
        const rates = arr.map((pair) => pair.pop());
        setExchangeRate(rates[0]);
      });
  }, []);

  // console.log(exchangeRate);

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
        <CurrencyHeader
          selectedFromOption={fromOption}
          selectedToOption={toOption}
          toAmount={toAmount}
          fromAmount={fromAmount}
        />

        <FromCurrency
          fromOptions={fromOptions}
          selectedFromOption={fromOption}
          onChangeFromCurrency={(e) => setFromOption(e.target.value)}
          amount={fromAmount}
          onAmountChange={handleFromAmountChange}
          handleFormSubmit={handleFormSubmit}
        />
        <div className="text-center text-slate-100 font-bold text-4xl"> = </div>
        <ToCurrency
          toOptions={toOptions}
          selectedToOption={toOption}
          onChangeToCurrency={(e) => setToOption(e.target.value)}
          amount={toAmount}
          onAmountChange={handleToAmountChange}
          handleFormSubmit={handleFormSubmit}
        />
      </motion.div>
    </div>
  );
}

export default App;
