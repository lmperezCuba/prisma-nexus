import { use, schema } from 'nexus'
import { prisma } from 'nexus-plugin-prisma'
import { PrismaClient } from '@prisma/client'
import { extractUser } from './helpers/user'
import { permissions } from './security/rules'

use(prisma())

const _prisma = new PrismaClient({
  // log: ['query'],
})

schema.addToContext((req) => {
  return {
    user: extractUser(req)
  };
});

// Security
use(permissions)