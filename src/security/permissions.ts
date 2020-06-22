import { rule } from "nexus-plugin-shield"

export const isAuthenticated = rule({ cache: 'contextual' })(
    async (parent, args, ctx: NexusContext, info) => {
        return ctx.user !== null && ctx.user.role !== 'invalid'
    }
)

export const isAdmin = rule({ cache: 'contextual' })(
    async (parent, args, ctx: NexusContext, info) => {
        return ctx.user?.role === 'admin'
    }
)

export const isEditor = rule({ cache: 'contextual' })(
    async (parent, args, ctx: NexusContext, info) => {
        return ctx.user?.role === 'editor'
    }
)