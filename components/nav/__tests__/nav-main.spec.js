import {shallowMount, mount} from '@vue/test-utils';
import NavMain from "/components/nav/nav-main";


test('display message', () => {
    const wrapper = mount(NavMain, {

    })

    expect(wrapper.text()).toContain('fotog.')
})
