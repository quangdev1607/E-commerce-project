const InputFields = ({ value, setValue, nameKey, type, invalidFields, setInvalidFields }) => {
  return (
    <div className="w-full flex flex-col gap-1">
      <input
        className="border-b-4 border-gray w-full my-2 pb-2 focus-visible:outline-none focus:border-purple-600"
        type={type || "text"}
        name={nameKey}
        placeholder={nameKey.slice(0, 1).toUpperCase() + nameKey.slice(1)}
        value={value}
        onChange={(e) => setValue((prev) => ({ ...prev, [nameKey]: e.target.value }))}
        onFocus={() => setInvalidFields([])}
      />

      {invalidFields?.some((el) => el.name === nameKey) && (
        <small className="text-main font-normal text-sm italic">
          {invalidFields?.find((el) => el.name === nameKey)?.msg}
        </small>
      )}
    </div>
  );
};

export default InputFields;
