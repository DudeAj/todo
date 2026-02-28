import axios from "axios";
export const resolvers = {
    Query: {
        tasks: async () => {
            const data = await axios.get("https://jsonplaceholder.typicode.com/todos");
            return data.data;
        },
        task: async (parent, { id }) => {
            const data = await axios.get("https://jsonplaceholder.typicode.com/todos/" + id);
            return data.data;
        },
        users: async () => {
            const data = await axios.get('https://jsonplaceholder.typicode.com/users');
            return data.data;
        },
        userById: async (parent, { id }) => {
            const data = await axios.get('https://jsonplaceholder.typicode.com/users/' + id);
            return data.data;
        }
    },
    // Mutation:{
    // }
};
//# sourceMappingURL=index.js.map