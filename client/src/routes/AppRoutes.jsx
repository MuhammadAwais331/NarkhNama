import { Routes, Route } from "react-router-dom";

import Home from "../pages/public/Home";
import CategoryProducts from "../pages/public/CategoryProducts";
import PriceTrends from "../pages/public/PriceTrends";
import ProductHistory from "../pages/public/ProductHistory";
import Announcements from "../pages/public/Announcements";
import AnnouncementDetails from "../pages/public/AnnouncementDetails";
import NotFound from "../pages/public/NotFound";

import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";

import TermsConditions from "../pages/public/TermsConditions";
import PrivacyPolicy from "../pages/legal/PrivacyPolicy";

// Admin

import AdminLayout from "../layouts/AdminLayout";
import Dashboard from "../pages/admin/Dashboard";
import Products from "../pages/admin/Products";
import Categories from "../pages/admin/Categories";
import Prices from "../pages/admin/Prices";
import AnnouncementsAdmin from "../pages/admin/Announcements";
import News from "../pages/admin/News";
import Users from "../pages/admin/Users";
import Reports from "../pages/admin/Reports";
import Settings from "../pages/admin/Settings";

import ProtectedRoute from "../components/auth/ProtectedRoute";
function AppRoutes() {

    return (

        <Routes>

            {/* =========================
                PUBLIC ROUTES
            ========================= */}

            <Route
                path="/"
                element={<Home />}
            />

            <Route
                path="/category/:categoryName"
                element={<CategoryProducts />}
            />

            <Route
                path="/price-trends"
                element={<PriceTrends />}
            />

            <Route
                path="/price-trends/:productId"
                element={<ProductHistory />}
            />

            <Route
                path="/announcements"
                element={<Announcements />}
            />

            <Route
                path="/announcements/:announcementId"
                element={<AnnouncementDetails />}
            />

            {/* =========================
                AUTH ROUTES
            ========================= */}

            <Route
                path="/login"
                element={<Login />}
            />

            <Route
                path="/signup"
                element={<Signup />}
            />

            <Route
                path="/forgot-password"
                element={<ForgotPassword />}
            />

            <Route
                path="/reset-password/:token"
                element={<ResetPassword />}
            />

            {/* =========================
                LEGAL ROUTES
            ========================= */}

            <Route
                path="/terms-conditions"
                element={<TermsConditions />}
            />

            <Route
                path="/terms-and-conditions"
                element={<TermsConditions />}
            />

            <Route
                path="/privacy-policy"
                element={<PrivacyPolicy />}
            />

            {/* =========================
                ADMIN ROUTES
            ========================= */}

            <Route
                path="/admin"
                element={
                    <ProtectedRoute>
                        <AdminLayout>
                            <Dashboard />
                        </AdminLayout>
                    </ProtectedRoute>
                }
            />

            <Route
                path="/admin/products"
                element={
                    <ProtectedRoute>
                        <AdminLayout>
                            <Products />
                        </AdminLayout>
                    </ProtectedRoute>
                }
            />

            <Route
                path="/admin/categories"
                element={
                    <ProtectedRoute>
                        <AdminLayout>
                            <Categories />
                        </AdminLayout>
                    </ProtectedRoute>
                }
            />

            <Route
                path="/admin/prices"
                element={
                    <ProtectedRoute>
                        <AdminLayout>
                            <Prices />
                        </AdminLayout>
                    </ProtectedRoute>
                }
            />

            <Route
                path="/admin/announcements"
                element={
                    <ProtectedRoute>
                        <AdminLayout>
                            <AnnouncementsAdmin />
                        </AdminLayout>
                    </ProtectedRoute>
                }
            />

            <Route
                path="/admin/news"
                element={
                    <ProtectedRoute>
                        <AdminLayout>
                            <News />
                        </AdminLayout>
                    </ProtectedRoute>
                }
            />

            <Route
                path="/admin/users"
                element={
                    <ProtectedRoute>
                        <AdminLayout>
                            <Users />
                        </AdminLayout>
                    </ProtectedRoute>
                }
            />

            <Route
                path="/admin/reports"
                element={
                    <ProtectedRoute>
                        <AdminLayout>
                            <Reports />
                        </AdminLayout>
                    </ProtectedRoute>
                }
            />

            <Route
                path="/admin/settings"
                element={
                    <ProtectedRoute>
                        <AdminLayout>
                            <Settings />
                        </AdminLayout>
                    </ProtectedRoute>
                }
            />

            {/* =========================
                404
            ========================= */}

            <Route
                path="*"
                element={<NotFound />}
            />

        </Routes>

    );

}

export default AppRoutes;