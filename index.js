const flatMap = require('lodash/flatMap');
const omit = require('lodash/omit');
const flattenColorPalette =
	require('tailwindcss/lib/util/flattenColorPalette').default;

const optionsDefault = {};

// NOTE we can use the types for tailwind as well as long as we don't use `addDynamic`
/** @type {import('windicss/types/interfaces').PluginFunction} */
const borderSides = ({ addUtilities, theme, variants, e }) => {
	// If your plugin requires user config,
	// you can access these options here.
	// Docs: https://tailwindcss.com/docs/plugins#exposing-options
	const colors = flattenColorPalette(theme('borderColor'));

	// Add CSS-in-JS syntax to create utility classes.
	// Docs: https://tailwindcss.com/docs/plugins#adding-utilities
	const utilities = flatMap(
		omit(colors, 'default', 'DEFAULT'),
		(value, modifier) => ({
			[`.${e(`border-t-${modifier}`)}`]: { borderTopColor: `${value}` },
			[`.${e(`border-r-${modifier}`)}`]: { borderRightColor: `${value}` },
			[`.${e(`border-b-${modifier}`)}`]: { borderBottomColor: `${value}` },
			[`.${e(`border-l-${modifier}`)}`]: { borderLeftColor: `${value}` },
		})
	);

	addUtilities(utilities, {
		variants: variants('borderSides', variants('borderColor')),
	});
};

module.exports = borderSides;
module.exports.borderSides = borderSides;
module.exports.optionsDefault = optionsDefault;
