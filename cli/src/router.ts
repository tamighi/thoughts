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

const root = createRootRoute({
  component: Root,
});

const homeRoute = createRoute({
  getParentRoute: () => root,
  path: "/",
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
  noteDetailRoute,
  labelsRoute,
  highlightsRoute,
  uploadRoute,
]);

const router = createRouter({ routeTree });

export default router;
