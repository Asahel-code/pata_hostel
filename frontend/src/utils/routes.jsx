import SigninScreen from "../screens/SigninScreen";
import RequestPasswordChangeScreen from "../screens/RequestPasswordChangeScreen";
import ResetPasswordScreen from "../screens/ResetPasswordScreen";
import VerifyAccountScreen from "../screens/VerifyAccountScreen";
import { BookRoomScreen, BookingHistorySreen, HomeScreen, HostelScreen, SingleBookingSreen, UserSignupScreen } from "../screens/user_screens";
import { DashboardScreen, HostelsScreen, LandlordProfileScreen, LandlordSetupScreen, LanlordSignupScreen, OccupantsScreen, PaymentsScreen, ViewHostelScreen } from "../screens/landlord_screens";
import { AdminDashboardScreen, LandlordManagementScreen, LocationScreen } from "../screens/admin_screens";
import AuthRouteMiddleware from "./middleware/AuthRouteMiddleware";
import LandlordRoutesMiddleware from "./middleware/LandlordRoutesMiddleware";
import AdminRouteMiddleware from "./middleware/AdminRouteMiddleware";

export const routes = [
    {
        path: "/register",
        element: <UserSignupScreen />
    },
    {
        path: "/login",
        element: <SigninScreen />
    },
    {
        path: "/request_reset_password",
        element: <RequestPasswordChangeScreen />
    },
    {
        path: "/reset_password",
        element: <ResetPasswordScreen />
    },
    {
        path: "/verify_your_account",
        element: <VerifyAccountScreen />
    },
    {
        path: '/',
        element: <HomeScreen />
    },
    {
        path: '/hostel/:slug',
        element: <HostelScreen />
    },
    {
        path: '/hostel/:slug/:room_number',
        element: <AuthRouteMiddleware><BookRoomScreen /></AuthRouteMiddleware>
    },
    {
        path: '/my_booking_history',
        element: <AuthRouteMiddleware><BookingHistorySreen /></AuthRouteMiddleware>
    },
    {
        path: '/my_booking_history/:id',
        element: <AuthRouteMiddleware><SingleBookingSreen /></AuthRouteMiddleware>
    },

    // Landlord Routes
    {
        path: '/landlord/register',
        element: <LanlordSignupScreen />
    },
    {
        path: '/landlord/setup',
        element: <LandlordRoutesMiddleware><LandlordSetupScreen /></LandlordRoutesMiddleware>
    },
    {
        path: '/landlord/profile',
        element: <LandlordRoutesMiddleware><LandlordProfileScreen /></LandlordRoutesMiddleware>
    },
    {
        path: '/landlord/dashboard',
        element: <LandlordRoutesMiddleware><DashboardScreen /></LandlordRoutesMiddleware>
    },
    {
        path: '/landlord/hostels',
        element: <LandlordRoutesMiddleware><HostelsScreen /></LandlordRoutesMiddleware>
    },
    {
        path: '/landlord/hostel_occupants',
        element: <LandlordRoutesMiddleware><OccupantsScreen /></LandlordRoutesMiddleware>
    },
    {
        path: '/landlord/hostel_payments',
        element: <LandlordRoutesMiddleware><PaymentsScreen /></LandlordRoutesMiddleware>
    },
    {
        path: '/landlord/hostels/:hostel_slug',
        element: <LandlordRoutesMiddleware><ViewHostelScreen /></LandlordRoutesMiddleware>
    },

    // Admin
    {
        path: '/admin/dashboard',
        element: <AdminRouteMiddleware><AdminDashboardScreen /></AdminRouteMiddleware>
    },
    {
        path: '/admin/locations',
        element: <AdminRouteMiddleware><LocationScreen /></AdminRouteMiddleware>
    },
    {
        path: '/admin/landlord_management',
        element: <AdminRouteMiddleware><LandlordManagementScreen /></AdminRouteMiddleware>
    },
]