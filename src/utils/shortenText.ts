interface ShortenTextOptions {
	text: string | undefined
	startLength?: number
	endLength?: number
}

export const shortenText = ({ text, endLength = 4, startLength = 4 }: ShortenTextOptions) => {
	if (!text) return undefined
	if (text.length <= startLength + endLength) return text
	return `${text.slice(0, startLength)}...${text.slice(-endLength)}`
}
