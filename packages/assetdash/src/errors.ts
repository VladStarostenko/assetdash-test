export class ResourceNotFound extends Error {
  constructor(resourceName: string, resourceId: number) {
    super(`${resourceName} with id "${resourceId}" was not found.`);
    Object.setPrototypeOf(this, ResourceNotFound.prototype);
  }
}
