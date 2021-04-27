import { createApp } from 'vue'
import App from './App.vue'
// import UnrealUI from '@/lib/index'
// import '@/lib/index/style.css'

// import UnrealUI from '@/packages/index'

import UnrealUI from 'unreal-ui-next'
import 'unreal-ui-next/lib/ur-index/style.css'

// import UnrealUI from 'unreal-ui-next'
// import { UrButton } from 'unreal-ui-next'
// import { UrTag } from 'unreal-ui-next'

const app = createApp(App)
app.use(UnrealUI)
// app.use(UrButton)
// app.use(UrTag)
app.mount('#app')
