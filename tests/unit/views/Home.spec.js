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

    it("if access token is no good, it reverts back to empty string.", () => {
        const tokenErrorMessage = "I reckon your access token ain't no good 'round here.";
        const mockStore = {
            dispatch: jest.fn(),
        }

        mockStore.dispatch.mockImplementation(() => {
            throw new Error(tokenErrorMessage);
        });

        const wrapper = shallowMount(Home, {
            global: {
                mocks: {
                    $store: mockStore
                }
            }
        });

        wrapper.vm.accessToken = "foobar";
        wrapper.vm.setAccessToken();

        expect(mockStore.dispatch).toHaveBeenCalledTimes(1);
        expect(mockStore.dispatch).toBeCalledWith("addAccessToken", "foobar");
        expect(wrapper.vm.tokenErrorMessage).toBe(tokenErrorMessage);
        expect(wrapper.vm.tokenSuccessful).toBe(false);
        expect(wrapper.vm.accessToken).toBe("");

    });



})
