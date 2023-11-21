import React from "react";

const InputFields = ({ value, setValue, nameKey, type, invalidFields, setInvalidFields }) => {
	return (
		<>
			<input
				className="border-b-4 border-gray w-full my-3 pb-2 focus-visible:outline-none focus:border-purple-600"
				type={type || "text"}
				name={nameKey}
				placeholder={nameKey.slice(0, 1).toUpperCase() + nameKey.slice(1)}
				value={value}
				onChange={(e) => setValue((prev) => ({ ...prev, [nameKey]: e.target.value }))}
			/>
		</>
	);
};

export default InputFields;
