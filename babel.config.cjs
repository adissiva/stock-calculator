module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: false
      }
    ],
    [
      '@babel/preset-react',
      {
        runtime: 'automatic'
      }
    ]
  ],
  plugins: [
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-proposal-optional-chaining'
  ],
  env: {
    production: {
      plugins: [
        'lodash',
        'trasnform-react-remove-prop-types',
        '@babel/plugin-transform-react-inline-elements',
        '@babel/plugin-transform-react-constant-elements',
        ['transform-remove-console', { exclude: ['error', 'warn'] }]
      ]
    },
    test: {
      plugins: ['babel-plugin-dynamic-import-node']
    }
  }
};
