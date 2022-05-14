import React from 'react';
import useFetch from '../hooks/useFetch';

export default function CurrencyRow({
  amount,
  onAmountChange,
  handleFormSubmit,
}) {
  const [setToOption, toOptions, toOption] = useFetch(
    `https://openexchangerates.org/api/currencies.json`
  );
  return (
    <div className="p-4 ">
      <form
        action=""
        className="form lg:flex justify-between items-center md:flex "
        onSubmit={handleFormSubmit}
      >
        <input
          type="number"
          placeholder="Currency"
          className="input w-72 p-4 pr-12 text-sm bg-slate-100 border-gray-400 rounded-lg shadow-sm focus:outline-none placeholder:text-neutral-600"
          value={amount}
          onChange={onAmountChange}
          onSubmit={handleFormSubmit}
        />
        <select
          className="input w-72 shrink p-4 pr-12 text-sm bg-slate-100 border-gray-400 rounded-lg shadow-sm focus:outline-none"
          value={toOption}
          onChange={(e) => setToOption(e.target.value)}
        >
          {toOptions?.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </form>
    </div>
  );
}
