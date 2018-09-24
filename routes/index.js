const router = require('koa-router')()
const home = require('./home')

const routes = [].concat(home)

routes.forEach((item, index) => {
    const param = (item.middleware && item.middleware.length) ? [...item.middleware, item.render] : [item.render]
    router[item.method || 'get'].call(router, item.path, ...param)
})

module.exports = router
