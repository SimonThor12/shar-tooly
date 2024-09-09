/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as ProfileImport } from './routes/profile'
import { Route as GalleryImport } from './routes/gallery'
import { Route as IndexImport } from './routes/index'

// Create/Update Routes

const ProfileRoute = ProfileImport.update({
  path: '/profile',
  getParentRoute: () => rootRoute,
} as any)

const GalleryRoute = GalleryImport.update({
  path: '/gallery',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/gallery': {
      id: '/gallery'
      path: '/gallery'
      fullPath: '/gallery'
      preLoaderRoute: typeof GalleryImport
      parentRoute: typeof rootRoute
    }
    '/profile': {
      id: '/profile'
      path: '/profile'
      fullPath: '/profile'
      preLoaderRoute: typeof ProfileImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/gallery': typeof GalleryRoute
  '/profile': typeof ProfileRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/gallery': typeof GalleryRoute
  '/profile': typeof ProfileRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/gallery': typeof GalleryRoute
  '/profile': typeof ProfileRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '/gallery' | '/profile'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/gallery' | '/profile'
  id: '__root__' | '/' | '/gallery' | '/profile'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  GalleryRoute: typeof GalleryRoute
  ProfileRoute: typeof ProfileRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  GalleryRoute: GalleryRoute,
  ProfileRoute: ProfileRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/gallery",
        "/profile"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/gallery": {
      "filePath": "gallery.tsx"
    },
    "/profile": {
      "filePath": "profile.tsx"
    }
  }
}
ROUTE_MANIFEST_END */