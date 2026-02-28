export declare const resolvers: {
    Query: {
        tasks: () => Promise<any>;
        task: (parent: any, { id }: {
            id: String;
        }) => Promise<any>;
        users: () => Promise<any>;
        userById: (parent: any, { id }: {
            id: String;
        }) => Promise<any>;
    };
};
//# sourceMappingURL=index.d.ts.map