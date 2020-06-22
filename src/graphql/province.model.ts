import { schema } from 'nexus'

schema.objectType({
  name: 'Province',
  definition(t) {
    t.model.id()
    t.model.code()
    t.model.country()
    t.model.name()
    t.model.initials()
    t.model.created_at()
    t.model.updated_at()
  },
})

// Extensions

// Used for extend the queries on several files. For example this file is just for country queries.
schema.extendType({
  type: 'Query',
  definition(t) {
    t.crud.province({ type: 'Province', alias: 'findOneProvince' })
    t.crud.provinces({ type: "Province", alias: 'findManyProvinces', ordering: true, filtering: true })
  },
})

// Used for extend the mutations on several files. For example this file is just for country queries.

schema.extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOneProvince({ type: 'Province' })
    t.crud.deleteOneProvince({ type: 'Province' })
  },
})