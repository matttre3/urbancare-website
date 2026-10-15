import { revalidateTag } from 'next/cache'
import type { CollectionAfterChangeHook, CollectionAfterDeleteHook, GlobalAfterChangeHook } from 'payload'
import { POSTS_CACHE_TAG, SETTINGS_CACHE_TAG } from '../../lib/cms-cache'

// CLI imports/tests can opt out; writes through the admin and REST API invalidate
// the public cache. Expire immediately so unpublished/deleted posts disappear.
export const revalidatePost: CollectionAfterChangeHook = ({ doc, previousDoc, req }) => {
  if (!req.context.disableRevalidation && (doc._status === 'published' || previousDoc?._status === 'published')) {
    revalidateTag(POSTS_CACHE_TAG, { expire: 0 })
  }
  return doc
}

export const revalidateDeletedPost: CollectionAfterDeleteHook = ({ doc, req }) => {
  if (!req.context.disableRevalidation && doc._status === 'published') revalidateTag(POSTS_CACHE_TAG, { expire: 0 })
  return doc
}

export const revalidateMedia: CollectionAfterChangeHook = ({ doc, req }) => {
  if (!req.context.disableRevalidation) revalidateTag(POSTS_CACHE_TAG, { expire: 0 })
  return doc
}

export const revalidateDeletedMedia: CollectionAfterDeleteHook = ({ doc, req }) => {
  if (!req.context.disableRevalidation) revalidateTag(POSTS_CACHE_TAG, { expire: 0 })
  return doc
}

export const revalidateSettings: GlobalAfterChangeHook = ({ doc, req }) => {
  if (!req.context.disableRevalidation) revalidateTag(SETTINGS_CACHE_TAG, { expire: 0 })
  return doc
}
