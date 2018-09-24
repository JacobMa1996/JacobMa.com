const home = [{
    path: '/',
    render: async (ctx) => {
        await ctx.render('home.html')
    }
}, {
    path: '/home',
    render: async (ctx) => {
        await ctx.render('home.html')
    }
}]

module.exports = home