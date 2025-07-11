import { faker } from '@faker-js/faker'
import * as bcrypt from 'bcrypt'
import { PrismaClient } from '../generated/prisma'

const prisma = new PrismaClient()

async function main() {
  // Create roles
  await prisma.role.createMany({
    data: [{ name: 'ADMIN' }, { name: 'CUSTOMER' }],
    skipDuplicates: true,
  })
  console.log('✅ Created roles.')

  const password = await bcrypt.hash('Aa@123', 10)

  const roles = await prisma.role.findMany()
  const adminRole = roles.find((r) => r.name === 'ADMIN')
  const customerRole = roles.find((r) => r.name === 'CUSTOMER')

  if (!adminRole || !customerRole) {
    throw new Error('You need to create both ADMIN and CUSTOMER roles.')
  }

  // Create admin user
  const adminUser = await prisma.user.create({
    data: {
      fullName: 'Admin User',
      phone: '0900000001',
      password,
      isActivated: true,
      userRoles: {
        create: {
          roleId: BigInt(adminRole.id),
        },
      },
      images: {
        create: {
          name: 'Admin Avatar',
          url: faker.image.avatar(),
          isAvatar: true,
          isDeleted: false,
        },
      },
    },
  })
  console.log(`✅ Created admin user: ${adminUser.fullName} - ${adminUser.phone}`)

  // Generate 99 customer users
  const phoneSet = new Set<string>()
  phoneSet.add('0900000001') // tránh trùng với admin

  function generateUniquePhone(): string {
    let phone: string
    do {
      phone = '09' + faker.string.numeric(8)
    } while (phoneSet.has(phone))
    phoneSet.add(phone)
    return phone
  }

  for (let i = 0; i < 99; i++) {
    const phone = generateUniquePhone()
    const fullName = faker.person.fullName()

    const user = await prisma.user.create({
      data: {
        fullName,
        phone,
        password,
        isActivated: faker.datatype.boolean(),
        userRoles: {
          create: {
            roleId: BigInt(customerRole.id),
          },
        },
        images: {
          create: {
            name: 'Avatar',
            url: faker.image.avatar(),
            isAvatar: true,
            isDeleted: false,
          },
        },
      },
    })

    console.log(`Created user: ${user.fullName} - ${user.phone}`)
  }
}

main()
  .then(async () => {
    console.log('🎉 Done seeding users.')
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error('❌ Seeding error:', e)
    await prisma.$disconnect()
    process.exit(1)
  })
