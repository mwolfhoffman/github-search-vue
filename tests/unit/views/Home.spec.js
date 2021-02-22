import { shallowMount } from '@vue/test-utils'
import Home from '@/views/Home.vue';


describe('Home.vue', () => {
    it('component is created', () => {
        const wrapper = shallowMount(Home);
        expect(wrapper).toBeTruthy();
    })

    it("on search, user is redirect to correct route", () => {
        const mockRoute = {
        }
        const mockRouter = {
            push: jest.fn()
        }

        const wrapper = shallowMount(Home, {
            global: {
                mocks: {
                    $route: mockRoute,
                    $router: mockRouter
                }
            }
        });

        wrapper.vm.searchTerm = "foobar"
        wrapper.vm.initiateSearch();
        expect(mockRouter.push).toHaveBeenCalledTimes(1)
        expect(mockRouter.push).toHaveBeenCalledWith({ "name": "Search-Results", "params": { "searchTerm": "foobar" } });
    });

    it("user is not redirected to seach results if there is no value in input", () => {
        const mockRoute = {
            path: "/"
        }
        const mockRouter = {
            push: jest.fn()
        }

        const wrapper = shallowMount(Home, {
            global: {
                mocks: {
                    $route: mockRoute,
                    $router: mockRouter
                }
            }
        });

        wrapper.vm.searchTerm = ""
        wrapper.vm.initiateSearch();
        expect(mockRouter.push).toHaveBeenCalledTimes(0);
        expect(mockRoute.path).toBe("/");
    });
})
