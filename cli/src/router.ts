import {
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import Root from "./pages/Root";
import NotesPage from "./pages/NotesPage";
import NoteDetailPage from "./pages/NoteDetailPage";
import LabelsPage from "./pages/LabelsPage";
import UploadPage from "./pages/UploadPage";
import HighlightsPage from "./pages/HighlightsPage";
import type { NotesQuery } from "./types/note";
import HomePage from "./pages/HomePage";

const root = createRootRoute({
  component: Root,
});

const homeRoute = createRoute({
  getParentRoute: () => root,
  path: "/",
  component: HomePage,
});

const notesRoute = createRoute({
  getParentRoute: () => root,
  path: "/notes",
  validateSearch: (search): NotesQuery => ({
    page: Math.max(1, Number(search.page) || 1),
    limit: Math.max(1, Number(search.limit) || 5),
    title:
      typeof search.title === "string" && search.title.trim()
        ? search.title
        : undefined,
  }),
  component: NotesPage,
});

const noteDetailRoute = createRoute({
  getParentRoute: () => root,
  path: "/notes/$noteId",
  component: NoteDetailPage,
});

const labelsRoute = createRoute({
  getParentRoute: () => root,
  path: "/labels",
  component: LabelsPage,
});

const highlightsRoute = createRoute({
  getParentRoute: () => root,
  path: "/highlights",
  component: HighlightsPage,
});

const uploadRoute = createRoute({
  getParentRoute: () => root,
  path: "/upload",
  component: UploadPage,
});

const routeTree = root.addChildren([
  homeRoute,
  notesRoute,
  noteDetailRoute,
  labelsRoute,
  highlightsRoute,
  uploadRoute,
]);

const router = createRouter({ routeTree });

export default router;
