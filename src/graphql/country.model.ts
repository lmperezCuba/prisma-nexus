import { schema } from 'nexus'

schema.objectType({
    name: 'Country',
    definition(t) {
        t.model.id()
        t.model.code_iso_alpha3()
        t.model.code_m49()
        t.model.name()
        t.model.province({ type: 'Province', filtering: true })
        t.model.created_at()
        t.model.updated_at()
    },
})

/**
 * Queries
 * 
 * Used for defining all queries on one file. Repeat ALL QUERIES ON ONE FILE.
 */ 
schema.queryType({
    definition(t) {
        t.crud.countries({ type: "Country", alias: 'findManyCountries', ordering: true, filtering: true })
    }
})

/**
 * Mutations
 * 
 * Used for defining all mutations on one file. Repeat ALL MUTATIONS ON ONE FILE.
 */ 
schema.mutationType({
    definition(t) {
        t.crud.createOneCountry({ type: 'Country' })
        t.crud.deleteOneCountry({ type: 'Country' })
    },
})

// Extensions

// Used for extend the queries on several files. For example this file is just for country queries.
schema.extendType({
    type: 'Query',
    definition(t) {
        t.crud.country({ type: 'Country', alias: 'findOneCountry' })
    },
})

// Used for extend the mutations on several files. For example this file is just for country queries.
schema.extendType({
    type: 'Mutation',
    definition(t) {
        t.crud.updateOneCountry({ type: 'Country', alias: 'deleteOneCountry' })        
    },
})

/*
schema.extendType({
    type: 'Mutation',
    definition(t) {
        t.field('createCountry', {
            type: 'Country',
            nullable: false,
            args: {
                name: schema.stringArg({ required: true }),
                code_iso_alpha3: schema.stringArg({ required: true }),
                code_m49: schema.stringArg({ required: true }),
            },
            resolve(_root, args, ctx) {
                const country = {
                    name: args.name,
                    code_iso_alpha3: args.code_iso_alpha3,
                    code_m49: args.code_m49
                }
                return ctx.db.country.create({ data: country })
            },
        })
    },
})
*/