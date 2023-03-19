import {assign, createMachine} from "xstate";

interface Context {
    retries: number;
}

const fetchMachine = createMachine<Context>({
    id: 'fetch',
    initial: 'idle',
    context: {
        retries: 0
    },
    states: {
        idle: {
            on: {
                FETCH: 'hisTurn'
            }
        },
        hisTurn: {
            on: {
                RESOLVE: 'success',
                REJECT: 'failure'
            }
        },
        success: {
            type: 'final'
        },
        failure: {
            on: {
                RETRY: {
                    target: 'hisTurn',
                    actions: assign({
                        retries: (context, event) => context.retries + 1
                    })
                }
            }
        }
    }
});
