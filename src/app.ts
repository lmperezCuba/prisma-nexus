import { use } from 'nexus'
import { prisma } from 'nexus-plugin-prisma'
import { PrismaClient } from '@prisma/client'

use(prisma())

const _prisma = new PrismaClient({
  log: ['query'],
})
