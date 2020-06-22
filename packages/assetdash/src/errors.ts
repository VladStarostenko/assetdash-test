export class ResourceNotFound extends Error {
  constructor(resourceName: string, resourceId: number) {
    super(`No ${resourceName} was found by "${resourceId}"`);
    Object.setPrototypeOf(this, ResourceNotFound.prototype);
  }
}
