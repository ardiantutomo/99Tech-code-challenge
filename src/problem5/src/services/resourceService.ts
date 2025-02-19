import { ResourceRepository } from "../repositories/resourceRepository";

const resourceRepository = new ResourceRepository();

export class ResourceService {
  async createResource(data: { name: string; value: string; status?: string }) {
    return resourceRepository.create(data);
  }

  async getResources(filter?: { status?: string }) {
    return resourceRepository.findAll(filter);
  }

  async getResourceById(id: number) {
    return resourceRepository.findById(id);
  }

  async updateResource(
    id: number,
    data: { name?: string; value?: string; status?: string }
  ) {
    return resourceRepository.update(id, data);
  }

  async deleteResource(id: number) {
    return resourceRepository.delete(id);
  }
}
