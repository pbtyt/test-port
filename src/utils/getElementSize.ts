export type ElementSizeType = { width: number; height: number };
export function getSize(element: HTMLElement): ElementSizeType {
	const rect: DOMRect = element.getBoundingClientRect();

	return {
		width: rect.width,
		height: rect.height,
	};
}
