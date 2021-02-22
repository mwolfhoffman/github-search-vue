import { shallowMount, mount } from '@vue/test-utils';
import App from '@/App.vue';

describe('App.vue', () => {
  it('component is created', () => {
    const wrapper = mount(App);
    expect(wrapper).toBeTruthy();
  })
})
