export default function FromCurrency({
  fromOptions,
  amount,
  onAmountChange,
  setFromOption,
  fromOption,
}) {
  return (
    <div className="p-4 form lg:flex justify-between items-center md:flex">
      <input
        type="number"
        placeholder="Currency"
        className="input w-72 p-4 pr-12 text-sm bg-slate-100 border-gray-400 rounded-lg shadow-sm focus:outline-none placeholder:text-neutral-600"
        value={isNaN(amount) ? '' : amount}
        onChange={onAmountChange}
      />
      <select
        className="input w-72 p-4 pr-12 text-sm bg-slate-100 border-gray-400 rounded-lg shadow-sm focus:outline-none "
        value={fromOption}
        onChange={(e) => setFromOption(e.target.value)}
      >
        {fromOptions?.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
