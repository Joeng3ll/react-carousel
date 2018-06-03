module.exports = function(shipit) {
  shipit.initConfig({
    staging: {
      workspace: '/usr/share/nginx/xindaijia-web',
      servers: [
        // {
        //   host: '120.27.198.168',
        //   user: 'root',
        // },
        {
          host: '120.26.222.31',
          user: 'root',
        },
        {
          host: '114.55.100.100',
          user: 'root',
        },
      ],
    },
  })

  shipit.task('default', function() {
    console.log('Usage:')
    console.log('\tnpm run deploy')
  })

  shipit.task('copy', function() {
    const serverPath = '/usr/share/nginx/xindaijia-web/entries/salaryRescue'
    return shipit.remoteCopy('./dist/*', serverPath)
  })

  shipit.task('deploy', function() {
    shipit.start('copy')
  })
}
