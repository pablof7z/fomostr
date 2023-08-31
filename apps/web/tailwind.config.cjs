/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		"./node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}",
	],
	// darkMode: 'class',
	theme: {
	  extend: {
		sans: ['Inter var'],
		colors: {
		  "gradient1": "#FF5E63",
		  "gradient2": "#FF7E34",
		  "gradient3": "#916EFF",
		  "gradient4": "#5CA2FF",
		  "accent2": "#FB6038",
		},
		width: {
		  'sidebar': '244px',
		  'main': '700px',
		},
		spacing: {
		  '32': '32px'
		}
	  },
	  fontFamily: {
		serif: ["Lora"]
	  }
	},
	plugins: [
	  require('@tailwindcss/forms'),
	  require("@tailwindcss/typography"),
	  require("daisyui"),
	],
	daisyui: {
	  themes: [
		{
		  light: {
			...require("daisyui/src/theming/themes")["[data-theme=light]"],
			".text-base-100-content": {
				"color": "#000000",
			  },
			  ".btn-rounded-full": {
				"border-radius": "9999px !important",
			  },
		  },
		  dark: {
			...require("daisyui/src/theming/themes")["[data-theme=dark]"],
			".text-base-100-content": {
				"color": "#ffffff",
			  },
			  ".btn-rounded-full": {
				"border-radius": "9999px !important",
			  },
		  }
		}
	  ],
	  "darkTheme": "black",
	},
  }
