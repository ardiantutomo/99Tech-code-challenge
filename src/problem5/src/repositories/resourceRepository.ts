import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class ResourceRepository {
  async create(data: { name: string; value: string; status?: string }) {
    return prisma.resource.create({ data });
  }

  async findAll(filter?: { status?: string }) {
    return prisma.resource.findMany({
      where: filter,
    });
  }

  async findById(id: number) {
    return prisma.resource.findUnique({ where: { id } });
  }

  async update(
    id: number,
    data: { name?: string; value?: string; status?: string }
  ) {
    return prisma.resource.update({ where: { id }, data });
  }

  async delete(id: number) {
    return prisma.resource.delete({ where: { id } });
  }
}
