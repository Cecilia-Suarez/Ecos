import { Route, Routes } from "react-router";
import { HomePage } from "@/home/HomePage";
import { MainLayout } from "@/app/layout/MainLayout";
import ProfileMusicianPage from "@/profile/musician/ProfileMusicianPage";
import ExplorerPage from "@/explorer/components/ExplorerPage";
import ArtistPage from "@/artist/components/ArtistPage";
import ProfileFanPage from "@/profile/fan/ProfileFanPage";
import ProtectedRoute from "@/auth/components/ProtectedRoute";
import EventPage from "@/event/EventPage";
import { EditProfileMusicianPage } from "@/profile/musician/EditProfileMusicianPage";
import { BackButtonLayout } from "@/app/layout/BackButtonLayout";
import { EventById } from "@/app/components/EventById";

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Layout principal con header y footer */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<div>404 NOT FOUND</div>} />
        <Route path="/explorer" element={<ExplorerPage />} />
        <Route path="/artist" element={<ArtistPage />} />
        <Route path="/profile/musician/:id" element={<ProfileMusicianPage />} />

        {/* Rutas protegidas */}
        <Route element={<ProtectedRoute />}>
          <Route path="/profile/fan/:id" element={<ProfileFanPage />} />
        </Route>
      </Route>

      {/* BackButtonLayout */}
      <Route element={<BackButtonLayout />}>
        <Route path="/event/:id" element={<EventById />} />

        {/* Rutas protegidas */}
        <Route element={<ProtectedRoute />}>
          <Route path="/profile/musician/edit" element={<EditProfileMusicianPage />} />
          <Route path="/event" element={<EventPage />} />
        </Route>
      </Route>
    </Routes>
  );
};
