import React from 'react';
import useFetch from '../hooks/useFetch';

export default function CurrencyHeader({ toAmount, fromAmount }) {
  const [fromOption, toOption] = useFetch(
    'https://openexchangerates.org/api/currencies.json'
  );
  return (
    <header className="p-6 border-b-2 mb-6   ">
      <div className="flex flex-col justify-evenly">
        <h3 className="text-gray-300 text-base font-secondary font-semibold">
          {!isNaN(fromAmount) &&
            fromAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
          <span className="pl-2">{fromOption} complies to</span>
        </h3>
        <h2 className="text-amber-300 pt-2 font-semibold text-2xl">
          {!isNaN(toAmount) &&
            toAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
          <span className="pl-2">{toOption}</span>
        </h2>
      </div>
    </header>
  );
}
