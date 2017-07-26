import Vue from 'vue'
import router from '@/router'
import SignUp from '@/components/AnonymousPage/Authentication/SignUp'
import Vuelidate from 'vuelidate'

Vue.use(Vuelidate)

describe('SignUp Component', () => {
  var vm
  before(() => {
    const Constructor = Vue.extend(SignUp)
    vm = new Constructor({ router }).$mount()
  })
  describe('ValidateFields Method', () => {
    it('should push 4 errors and return false', () => {
      expect(vm.validateFields()).to.be.false
      expect(vm.errors.length).to.equal(4)
    })
    it('should delete existing errors and push new ones after a field has passed the validation', (done) => {
      vm.userName = 'testUsername123'
      Vue.nextTick(() => {
        vm.validateFields()
        expect(vm.errors.length).to.equal(3)
        done()
      })
    })
    it('should not push any errors and return true', (done) => {
      vm.userName = 'testUsername123'
      vm.userEmail = 'testEmail@test.com'
      vm.userPassword = '123456'
      vm.passwordMatch = '123456'
      Vue.nextTick(() => {
        expect(vm.validateFields()).to.be.true
        expect(vm.errors.length).to.equal(0)
        done()
      })
    })
  })
})
