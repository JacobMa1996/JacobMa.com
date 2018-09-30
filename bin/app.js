const Koa = require('koa')
const app = new Koa()
const path = require('path')
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const nunjucks = require('nunjucks')
const routes = require('../routes')
// error handler
onerror(app)

// middlewares
app.use(bodyparser({
    enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(path.resolve(__dirname, '/src')))

app.use(views(path.resolve(__dirname, '../views'), {
    extension: 'html',
    map: {
      html: 'nunjucks'
    }
}))

// logger
app.use(async (ctx, next) => {
    const start = new Date()
    await next()
    const ms = new Date() - start
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
// routers.forEach(val => {
//   app.use(val.routes(), val.allowedMethods())
// })
app.use(routes.routes())
app.use(routes.allowedMethods())


// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
})

module.exports = app
