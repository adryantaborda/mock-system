import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { 
  faStore, 
  faChevronLeft, 
  faChevronRight,
  faChartLine,
  faCalendarAlt,
  faBox,
  faUsers,
  faShoppingCart,
  faFileAlt,
  faWarehouse,
  faCog,
  faArrowUp,
  faArrowDown,
  faMobile,
  faLaptop,
  faHeadphones,
  faTv,
  faGamepad,
  faDesktop,
  faClock,
  faKeyboard,
  faMouse
} from '@fortawesome/free-solid-svg-icons'

import App from './App.vue'
import router from './router'

import 'primeicons/primeicons.css'
import './style.css'

// Adicionar ícones ao library
library.add(
  faStore,
  faChevronLeft,
  faChevronRight,
  faChartLine,
  faCalendarAlt,
  faBox,
  faUsers,
  faShoppingCart,
  faFileAlt,
  faWarehouse,
  faCog,
  faArrowUp,
  faArrowDown,
  faMobile,
  faLaptop,
  faHeadphones,
  faTv,
  faGamepad,
  faDesktop,
  faClock,
  faKeyboard,
  faMouse
)

const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon)
app.use(createPinia())
app.use(router)
app.use(PrimeVue, {
  theme: {
    preset: Aura
  }
})

app.mount('#app')

