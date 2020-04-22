// mint-ui 需要用到的组件
import Vue from 'vue'
import { Cell, CellGroup, Button, Calendar, Image, Popup, CheckboxGroup, Checkbox, DatetimePicker, Field, Form, Picker, RadioGroup, Radio, Uploader, ActionSheet, Icon, Divider, Dialog } from 'vant'
import Toast from '@/assets/toast'

Vue.component(CellGroup.name, CellGroup)
Vue.component(Cell.name, Cell)
Vue.component('van-dialog', Dialog)
Vue.component(Button.name, Button)
Vue.component(Calendar.name, Calendar)
Vue.component(Image.name, Image)
Vue.component(Popup.name, Popup)
Vue.component(CheckboxGroup.name, CheckboxGroup)
Vue.component(Checkbox.name, Checkbox)
Vue.component(DatetimePicker.name, DatetimePicker)
Vue.component(Field.name, Field)
Vue.component(Form.name, Form)
Vue.component(Picker.name, Picker)
Vue.component(RadioGroup.name, RadioGroup)
Vue.component(Radio.name, Radio)
Vue.component(Uploader.name, Uploader)
Vue.component(ActionSheet.name, ActionSheet)
Vue.component(Icon.name, Icon)
Vue.component(Divider.name, Divider)

Vue.prototype.$Toast = Toast
