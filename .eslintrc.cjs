// .eslintrc.cjs
module.exports = {
	env: {
		browser: true,
		es2021: true,
		node: true
	},
	// 新增./.eslintrc-auto-import.json
	extends: ['standard', 'plugin:vue/vue3-essential', 'prettier', './.eslintrc-auto-import.json'],
	overrides: [
		{
			env: {
				node: true
			},
			files: ['.eslintrc.{js,cjs}'],
			parserOptions: {
				sourceType: 'script'
			}
		}
	],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module'
	},
	plugins: ['vue', 'prettier'],
	rules: {
		'vue/multi-word-component-names': 'off',
		'vue/no-useless-template-attributes': 'off',
		'prettier/prettier': 'error'
	}
}
