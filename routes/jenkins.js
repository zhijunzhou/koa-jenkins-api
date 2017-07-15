const router = require('koa-router')()
const jenkins = require('../services/jenkins')

router.prefix('/jenkins')

router.get('/', (ctx, next) => {
  ctx.body = 'this is a jenkins root api!'
})

router.get('/jobs', async (ctx, next) => {
  const { data } = await jenkins.allJobs
  ctx.body = data
  return next()
})

router.get('/job/:jobName', async (ctx, next) => {
  const { data } = await jenkins.jobInfo(ctx.params.jobName)
  ctx.body = data
  return next()
})

router.post('/job/create', async (ctx, next) => {
  const { data } = await jenkins.createJob(ctx.query.name, ctx.req)
  ctx.body = ctx.req
  return next()
})

router.post('/job/build/:jobName', async (ctx, next) => {
  const { data } = await jenkins.buildJob(ctx.params.jobName)
  ctx.body = data
  return next()
})

router.delete('/job/:jobName', async (ctx, next) => {
  const { data } = await jenkins.delJob(ctx.params.jobName)
  ctx.body = data
  return next()
})

module.exports = router
