const path = require('path')
var prod = process.env.NODE_ENV === 'production'

module.exports = {
  wpyExt: '.wpy',
  build: {
    web: {
      htmlTemplate: path.join('src', 'index.template.html'),
      htmlOutput: path.join('web', 'index.html'),
      jsOutput: path.join('web', 'index.js')
    }
  },
  eslint: true,
  compilers: {
    less: {
      compress: true
    },
    // sass: {
    //   outputStyle: 'compressed'
    // },
    babel: {
      sourceMap: true,
      presets: [
        'es2015',
        'stage-1'
      ],
      plugins: [
        'transform-decorators-legacy',
        'transform-export-extensions',
        'syntax-export-extensions'
      ]
    }
  },
  plugins: {
    replace: {
      filter: /\.wxml$/,
      config: {
        find: /<\!-- wepyhtml-repeat start -->([\W\w]+?)<\!-- wepyhtml-repeat end -->/,
        replace(match, tpl) {
          let result = ''
          let prefix = ''

          tpl = tpl.replace(/\{\{\s*(\$.*?\$)thisIsMe\s*\}\}/, (match, p) => {
            prefix = p
            return ''
          })

          for (let i = 0; i <= 20; i++) {
            result += '\n' + tpl
              .replace('wepyhtml-0', 'wepyhtml-' + i)
              .replace(/<\!-- next template -->/g, () => {
                return i === 20 ? '' : `<template is="wepyhtml-${i + 1}" wx:if="{{ item.children }}" data="{{ ${prefix}content: item.children, ${prefix}imgInsteadOfVideo: ${prefix}imgInsteadOfVideo }}"></template>`
              })
          }
          return result
        }
      }
    }
  }
}

if (prod) {

  delete module.exports.compilers.babel.sourcesMap
  // 压缩sass
  // module.exports.compilers['sass'] = {outputStyle: 'compressed'}

  // 压缩less
  module.exports.compilers['less'] = {compress: true}

  // 压缩js
  module.exports.plugins = {
    uglifyjs: {
      filter: /\.js$/,
      config: {}
    },
    imagemin: {
      filter: /\.(jpg|png|jpeg)$/,
      config: {
        jpg: {
          quality: 80
        },
        png: {
          quality: 80
        }
      }
    },
    replace: {
      filter: /\.wxml$/,
      config: {
        find: /<\!-- wepyhtml-repeat start -->([\W\w]+?)<\!-- wepyhtml-repeat end -->/,
        replace(match, tpl) {
          let result = ''
          let prefix = ''

          tpl = tpl.replace(/\{\{\s*(\$.*?\$)thisIsMe\s*\}\}/, (match, p) => {
            prefix = p
            return ''
          })

          for (let i = 0; i <= 20; i++) {
            result += '\n' + tpl
              .replace('wepyhtml-0', 'wepyhtml-' + i)
              .replace(/<\!-- next template -->/g, () => {
                return i === 20 ? '' : `<template is="wepyhtml-${i + 1}" wx:if="{{ item.children }}" data="{{ ${prefix}content: item.children, ${prefix}imgInsteadOfVideo: ${prefix}imgInsteadOfVideo }}"></template>`
              })
          }
          return result
        }
      }
    }
  }
}
