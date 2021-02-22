import SearchResultItem from './search-result-item.class';

export default class SearchResult {
    incomplete_results!: boolean;
    items!: SearchResultItem[];
    total_count!: number;
}