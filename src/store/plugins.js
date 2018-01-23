import createLogger from 'vuex/dist/logger'

// const logger =createLogger({
//     collapsed:false,
//     filter (mutation, stateBefore, stateAfter) {
//         return mutation.type != "aBlacklistedMutation"
//     },
//     transformer (state) {
//         return state.subTree
//     },
//     mutationTransformer (mutation) {
//         return mutation.type
//     },
//     logger: console,
// })

export default process.env.NODE_ENV !== 'production'?
    [createLogger()]:[]