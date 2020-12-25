// @flow

import React from 'react';

import Select, { ActionMeta, OptionTypeBase, ValueType } from 'react-select';
import { colourOptions } from './models/data';

const CustomClearText = (): JSX.Element => (
	<div className='clear-all-button'>clear all</div>
);

// button for clearing current selected items could be customized
// by returning a JSX.Element, am HTML elements fragment
// children is JSX sandwiched between <tag>{children}</tag>
// getStyles is a callback reference
// ref is a forwardRef so parent component can handle reffed element
const ClearIndicator = (props: any): JSX.Element => {
	// the props object is expected to have properties that
	// we destructure as follows
	const {
		children = <CustomClearText />,
		getStyles,
		innerProps: { ref, ...restInnerProps },
	} = props;
	return (
		<div
			{...restInnerProps}
			ref={ref}
			style={getStyles('clearIndicator', props)}
		>
			<div style={{ padding: '0px 5px' }}>{children}</div>
		</div>
	);
};

const ClearIndicatorStyles = (base: any, state: any) => ({
	...base,
	cursor: 'pointer',
	color: state.isFocused ? 'blue' : 'black',
});

export const CustomClearIndicator: React.FC = () => {
	const handleChange = (
		option: ValueType<OptionTypeBase, false>,
		meta: ActionMeta<any>
	): void => {
		console.log('option', option);
		console.log('meta', meta);
		console.log('option?.label, option?.value', option?.label, option?.value);
		console.log('meta.action, meta.name', meta.action, meta.name);
		// onSelect({
		//   name: option && option.label,
		//   id: option && option.value,
		// });
	};
	const [state, setState] = React.useState<{ isFocused: boolean }>({
		isFocused: true,
	});
	return (
		<Select
			className='multi-select'
			closeMenuOnSelect={true}
			components={{ ClearIndicator }}
			styles={{ clearIndicator: ClearIndicatorStyles }}
			defaultValue={[colourOptions[4], colourOptions[5]]}
			isMulti
			options={colourOptions}
		/>
	);
};