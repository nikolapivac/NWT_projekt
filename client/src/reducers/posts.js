//handling the logic for each possible action type

export default (posts = [], action) => {
    switch (action.type) {
        case 'FETCH_ALL':
            return action.payload;
        case 'CREATE':
            // spreading the existing posts and adding a new one (stored in the payload of the action)
            return [...posts, action.payload];
        default:
            return posts;
    }
}