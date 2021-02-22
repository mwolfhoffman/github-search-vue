import ISearchResultInterface from './isearch-result-item.interface';
import Follower from './follower.class';
import Star from './star.class';
import IRateLimitError from './rate-limit-error.class';

export default class SearchResult implements ISearchResultInterface {
    followers?: Follower[] | IRateLimitError
    stars?: Star[] | IRateLimitError
    avatar_url!: string;
    events_url!: string;
    followers_url!: string;
    following_url!: string;
    gists_url!: string;
    gravatar_id!: string;
    html_url!: string;
    id!: number
    login!: string;
    node_id!: string;
    organizations_url!: string;
    received_events_url!: string;
    repos_url!: string;
    score!: number;
    site_admin!: boolean
    starred_url!: string;
    subscriptions_url!: string;
    type!: string;
    url!: string;

}