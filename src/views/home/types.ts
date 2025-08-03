export type HomeManager = {
    state: {
        id: string;
    };
    changeId: (id: string) => void;
    load: () => void;
}
