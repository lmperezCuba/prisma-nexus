import { shield, not, allow, and, or, deny } from 'nexus-plugin-shield'
import { isAuthenticated, isAdmin, isEditor } from './permissions'

export const permissions = shield({
    rules: {
      Query: {
        findManyCountries: not(isAuthenticated),
        findManyProvinces: and(isAuthenticated, or(isAdmin, isEditor)),
      },
      Mutations: {
        createOneProvince: and(isAuthenticated, isAdmin),
        deleteOneProvince: and(isAuthenticated, isAdmin),
      },
      // Country: isAuthenticated,
      // Province: isAdmin,
    },
    options: {
      fallbackRule: allow,  // deny
    },
  })