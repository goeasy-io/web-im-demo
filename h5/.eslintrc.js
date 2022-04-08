module.exports = {
	root: true,
	env: {
		node: true,
	},
	extends: [
		'@vue/prettier',
	],
	parserOptions: {
		ecmaVersion: 2020,
		sourceType: 'module'
	},
	rules: {
		'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		"prettier/prettier": "off",
		'no-var': 'error',// 禁止使用 var
		'vue/comment-directive': 0,
		'vue/no-unused-components': 0,
		'vue/no-use-v-if-with-v-for': 0,
		'vue/require-prop-type-constructor': 0,
		'vue/use-v-on-exact': 0,
		quotes: [1, 'single'],// 只使用单引号
		'vue/html-indent': [
			'error',
			4,
			{
				attribute: 1,
				baseIndent: 1,
				closeBracket: 0,
				alignAttributesVertically: true,
				ignores: [],
			},
		],
		'@typescript-eslint/no-var-requires': 0
	},
};
