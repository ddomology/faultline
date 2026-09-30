export class DeploymentChanged extends Error {
  buildId: string
  constructor(buildId: string) { super('Deployment changed'); this.buildId = buildId }
}

// A long-lived tab must not interpret a newer deployment's loader schema using
// older chunks. Keep the URL/hash and make one document request for that version.
export async function loadCurrentVersion<T extends { buildId: string }>(load: () => Promise<T>, request: Request): Promise<T> {
  const data = await load()
  if (!/^[a-zA-Z0-9-]{1,64}$/.test(data.buildId || '')) throw new Error('Invalid deployment version')
  if (data.buildId !== __FAULTLINE_BUILD_ID__) {
    const target = new URL(request.url)
    if (target.searchParams.get('_flv') === data.buildId) throw new Error('Deployment is still updating')
    // Loader requests omit fragments. The route boundary reloads only after the
    // requested location has committed, so the destination hash is preserved.
    throw new DeploymentChanged(data.buildId)
  }
  return data
}
