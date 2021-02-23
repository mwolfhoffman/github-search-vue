import { shallowMount } from '@vue/test-utils'
import SearchResults from '@/views/SearchResults.vue';

let wrapper;

describe('SearchResults.vue', () => {

    beforeEach(() => {
        const mockStore = {
            dispatch: jest.fn(),
            commit: jest.fn(),
            state: {},
            actions: {
                searchUsers: jest.fn()
            }
        };
        const mockRoute = {
            params: {
                searchTerm: "foobar"
            }
        }
        const mockRouter = {
            push: jest.fn()
        }
        wrapper = shallowMount(SearchResults, {
            global: {
                mocks: {
                    $store: mockStore,
                    $route: mockRoute,
                    $router: mockRouter,
                    searchUsers: jest.fn()
                }
            }
        });

    })

    it('component is created', () => {
        expect(wrapper).toBeTruthy();
    });

    it('if on first page clicking previous does not execute search', () => {
        wrapper.vm.page = 1;
        let btn = wrapper.find("#decrement-page-btn")
        btn.trigger("click");
        expect(wrapper.vm.$router.push).toHaveBeenCalledTimes(0);
    })

    it('when on last page clicking previous does not execute search', () => {
        wrapper.vm.isLastPage = true;
        let btn = wrapper.find("#decrement-page-btn")
        btn.trigger("click");
        expect(wrapper.vm.$router.push).toHaveBeenCalledTimes(0);
    })

    it('search is executed when resultsPerPage select value changes', () => {
        wrapper.vm.search = jest.fn()
        wrapper.vm.resultsPerPage = 10;
        let select = wrapper.find("#results-per-page-select")
        select.trigger("change", { target: { value: 1000 } });
        expect(wrapper.vm.$store.dispatch).toHaveBeenCalledTimes(1);
        expect(wrapper.vm.$store.dispatch).toHaveBeenCalledWith("searchUsers", { "searchTerm": "foobar" });

    })
})
