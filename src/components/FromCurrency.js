import React from 'react';
import useFetch from '../hooks/useFetch';

export default function FromCurrency({
  amount,
  onAmountChange,
  handleFormSubmit,
}) {
  const [fromOptions, fromOption, setFromOption] = useFetch(
    'https://openexchangerates.org/api/'
  );
  return (
    <div className="p-4">
      <form
        action=""
        className="form lg:flex justify-between items-center md:flex"
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
          className="input w-72 p-4 pr-12 text-sm bg-slate-100 border-gray-400 rounded-lg shadow-sm focus:outline-none "
          value={fromOption}
          onChange={(e) => setFromOption(e.target.value)}
        >
          {fromOptions &&
            fromOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
        </select>
      </form>
    </div>
  );
}
