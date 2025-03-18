export const formatNumber = (value: string, decimals: number): string => {
	return parseFloat(value).toLocaleString('en-US', {
		minimumFractionDigits: decimals,
		maximumFractionDigits: decimals,
	});
};
