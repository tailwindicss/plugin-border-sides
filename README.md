# @tailwindicss/plugin-border-sides

> Utility classes for each single border side.

Install the plugin:

```
$ npm install --save-dev @tailwindicss/plugin-border-sides
```

```
$ yarn add -D @tailwindicss/plugin-border-sides
```

Then add the plugin to your `tailwind.config.js` or `windi.config.js` file:

```js
// tailwind.config.js \ windi.config.js
module.exports = {
	variants: {
		// ...
		theme: {
			colors: {
				black: {
					dark: '#010101',
				},
			},
		},
		// Optional. By default uses the same as `borderColor`.
		borderSides: ['responsive'],
		// ...
	},
	plugins: [
		// ...
		require('@tailwindicss/plugin-border-sides'),
		// ...
	],
};
```

This plugin will generate following CSS:

```css
/* ... */
..border-t-black-dark {
	border-top-color: #010101;
}
.border-r-black-dark {
	border-right-color: #010101;
}
.border-b-black-dark {
	border-bottom-color: #010101;
}
.border-l-black-dark {
	border-left-color: #010101;
}
/* ... */
```

## License

plugin-border-sides is licensed under the MIT License.

## Credits

Created with [create-tailwind-plugin](https://github.com/Landish/create-tailwind-plugin).
