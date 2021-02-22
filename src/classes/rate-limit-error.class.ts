export default class RateLimitError {
    //  It's possible the API request for Followers and Stars will return a Rate Limit error with a message and documentation_url. 
    message!: string;
    documentation_url?: string
}