import Dashboard from './components/Dashboard'
// import dashboard from './dashboard'
import StartupApps from './components/StartupApps'
import Services from './components/Services'
import Uninstaller from './components/Uninstaller'
import SystemCleaner from './components/SystemCleaner'

import { shell } from 'child_process'

new Vue({
    el: '#main',
    data: {
        activeNav: 1,
    },
    components: {
        'uninstaller': Uninstaller,
        'services': Services,
        'startup-apps': StartupApps,
        'system-cleaner': SystemCleaner,
        'dashboard': Dashboard,
    },
    methods: {
        download_update() {
            // open the link on browser
            shell.openExternal('https://github.com/oguzhaninan/Stacer/releases/latest')
        }
    },
    mounted() {
        // Update check
        try {
            $.getJSON('https://api.github.com/repos/oguzhaninan/Stacer/releases/latest', ( data ) => {
                let currentVersion = require('../package.json').version.toString()
                let releaseVersion = data.tag_name.substr(1).toString()

                this.update_check = (currentVersion != releaseVersion)
            })
        }
        catch(error) { console.log(error) }

        // Dashboard Page
        // dashboard.systemBars()
        // dashboard.networkBars()
    }
})

setTimeout(() => {
    $('#loading').remove()
}, 3000);
