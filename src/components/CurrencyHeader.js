import React from 'react';

export default function CurrencyHeader({
  selectedToOption,
  selectedFromOption,
  toAmount,
  fromAmount,
}) {
  return (
    <header className="p-6 border-b-2 mb-6   ">
      <div className="flex flex-col justify-evenly">
        <h3 className="text-gray-300 text-base font-secondary font-semibold">
          {!isNaN(fromAmount) &&
            fromAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
          {selectedFromOption} complies to
        </h3>
        <h2 className="text-amber-300 pt-2 font-semibold text-2xl">
          {!isNaN(toAmount) &&
            toAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
          <span className="pl-2">{selectedToOption}</span>
        </h2>
      </div>
    </header>
  );
}
