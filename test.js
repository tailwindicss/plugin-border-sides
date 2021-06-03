const merge = require('lodash/merge');
const cssMatcher = require('jest-matcher-css');
const postcss = require('postcss');
const tailwindcss = require('tailwindcss');
const customPlugin = require('./index');

expect.extend({
	toMatchCss: cssMatcher,
});

function generatePluginCss(overrides) {
	const config = {
		theme: {
			// Default options for your plugin.
			colors: {
				black: {
					dark: '#010101',
					light: '#090909',
				},
			},
		},
		variants: {
			// Default variants for your plugin.
			borderSides: [],
		},
		corePlugins: false,
		plugins: [customPlugin],
	};

	return postcss(tailwindcss(merge(config, overrides)))
		.process('@tailwind utilities', {
			from: undefined,
		})
		.then(({ css }) => css);
}

test('utility classes can be generated', () =>
	generatePluginCss().then(css => {
		expect(css).toMatchCss(`
    .border-t-black-dark {
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
    .border-t-black-light {
      border-top-color: #090909;
    }
    .border-r-black-light {
      border-right-color: #090909;
    }
    .border-b-black-light {
      border-bottom-color: #090909;
    }
    .border-l-black-light {
      border-left-color: #090909;
    }
    `);
	}));

test('variants can be customized', () =>
	generatePluginCss({
		variants: {
			borderSides: ['hover'],
		},
	}).then(css => {
		expect(css).toMatchCss(`
    .border-t-black-dark {
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
    .border-t-black-light {
      border-top-color: #090909;
    }
    .border-r-black-light {
      border-right-color: #090909;
    }
    .border-b-black-light {
      border-bottom-color: #090909;
    }
    .border-l-black-light {
      border-left-color: #090909;
    }
    
    .hover\\:border-t-black-dark:hover {
      border-top-color: #010101;
    }
    .hover\\:border-r-black-dark:hover {
      border-right-color: #010101;
    }
    .hover\\:border-b-black-dark:hover {
      border-bottom-color: #010101;
    }
    .hover\\:border-l-black-dark:hover {
      border-left-color: #010101;
    }
    .hover\\:border-t-black-light:hover {
      border-top-color: #090909;
    }
    .hover\\:border-r-black-light:hover {
      border-right-color: #090909;
    }
    .hover\\:border-b-black-light:hover {
      border-bottom-color: #090909;
    }
    .hover\\:border-l-black-light:hover {
      border-left-color: #090909;
    }
    `);
	}));
