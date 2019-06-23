import React, { PropTypes } from 'react';
import classNames from 'classnames';

/**
 * Select element with search
 * Use Bootstrap default classes to minimize development efforts
 * Properties:
 * {string} id - element ID
 * {string} className - element class name
 * {string} placeholder - search input placeholder
 * {boolean} disabled - disabled flag
 * {any} value - selected value
 * {Array} selections - list of options, can be null if SearchableSelection takes list from server
 * {function} onChange - change callback. The component will call this function with new value as an argument.
 * {function} fetch - fetch callback. It should be null if we use client side filtering. Tt takes 2 arguments:
 * - {string} keyword - search string
 * - {function} callback - search callback which returns a new list of selections
 */

const SelectEditable = (
	{
		id,
		value,
		selections,
		className,
		tabIndex = 0,
		onChange = () => null,
		onBlur = () => null,
		trimOnBlur = false,
		disabled = false,
		type = "text",
		maxLength,
		onFocus
	}
) => {
	let editBox;
	return (
		<span
			id={id}
			className="selectEditable"
		>
		<select
			className={className}
			value={value}
			disabled={disabled}
			onChange={(e) => onChange(e.target.value)}>
			{selections.map((item, id) => <option key={id}>{item}</option>)}
		</select>
		<span
			className={classNames('text-input selectEditable', className)}
			onClick={(e) => e.stopPropagation()}>
			<input
				type={type}
				id={id}
				className={classNames('edit-box', className)}
				ref={(input) => {
					editBox = input;
				}}
				value={value}
				onChange={(e) => onChange(e.target.value)}
				onBlur={(e) => {
					const value = String(e.target.value);
					if (trimOnBlur && value.trim() !== value) {
						onChange(value.trim());
					}
					onBlur(trimOnBlur ? value.trim() : value);
				}}
				tabIndex={tabIndex}
				maxLength={maxLength}
				onFocus={onFocus}
			/>
	    </span>
	</span>
	);
};


SelectEditable.propTypes = {
	id: PropTypes.string,
	className: PropTypes.string,
	selections: PropTypes.array,
	value: PropTypes.any,
	onChange: PropTypes.func
};

export default SelectEditable;

