import { useState } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link } from '@inertiajs/react';
import { IoMdNotifications } from "react-icons/io";
import { IoChatbox } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
export default function AuthenticatedEmployee({ user, header, children, userId }) {
    // State to manage the visibility of the navigation dropdown
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="shrink-0 flex items-center">
                                <Link href="/">
                                    <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800" />
                                </Link>
                            </div>

                            <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
                                {/* Navigation links */}
                                <NavLink href={route('employee.dashboard',{userId})} active={route().current('employee.dashboard')}>
                                    Home Page
                                </NavLink>
                                <NavLink href={route('saved-posts',{userId})} active={route().current('saved-posts')}>
                                    Saved Posts
                                </NavLink>
                                <NavLink href={route('my-applications',{user})} active={route().current('my-applications')}>
                                    My Applications
                                </NavLink>
                            </div>
                        </div>

                        <div className="hidden sm:flex sm:items-center sm:ml-6">
                            {user && (
                                <div className="ml-3 relative flex space-x-4">
                                    {/* User dropdown */}
                                    <Dropdown>
                                        <Dropdown.Trigger>
                                            <button className="icon-button bg-gray-200 hover:bg-blue-500 transition duration-300 ease-in-out rounded-full p-2 focus:outline-none focus:ring focus:ring-blue-500">
                                                <FaUser size={24} className="text-gray-600 hover:text-blue" />
                                            </button>
                                        </Dropdown.Trigger>

                                        {/* Dropdown content */}
                                        <Dropdown.Content className="absolute right-0 mt-2 w-50 origin-top-right rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                                            {/* User profile info */}
                                            <div className="py-1">
                                                <div className="flex items-center px-2 py-3 border-b border-gray-200">
                                                    <div>
                                                        <div className="font-medium text-gray-900">{user.name}</div>
                                                        <div className="text-gray-500 text-sm">{user.email}</div>
                                                    </div>
                                                </div>
                                                {/* Profile and logout links */}
                                                <div className="py-1">
                                                    <Dropdown.Link href={user.role === 'employee' ? route('employee.profile.edit') : route('company.profile.edit')} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                                        Profile
                                                    </Dropdown.Link>
                                                    <Dropdown.Link href={route('logout')} method="post" as="button" className="block px-4 py-2 text-sm text-red-500 hover:bg-gray-100">
                                                        Logout
                                                    </Dropdown.Link>
                                                </div>
                                            </div>
                                        </Dropdown.Content>
                                    </Dropdown>

                                    {/* Notifications and chat buttons */}
                                    <button className="icon-button bg-gray-200 hover:bg-blue-500 transition duration-300 ease-in-out rounded-full p-2 focus:outline-none focus:ring focus:ring-blue-500">
                                        <IoMdNotifications size={24} className="text-gray-600 hover:text-blue" />
                                    </button>
                                    <button className="icon-button bg-gray-200 hover:bg-blue-500 transition duration-300 ease-in-out rounded-full p-2 focus:outline-none focus:ring focus:ring-blue-500">
                                        <IoChatbox size={24} className="text-gray-600 hover:text-blue" />
                                    </button>
                                </div>
                            )}
                        </div>

                        <div className="-mr-2 flex items-center sm:hidden">
                            {/* Hamburger menu button */}
                            <button
                                onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                            >
                                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                    {/* Hamburger menu icon */}
                                    <path
                                        className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    {/* Close menu icon */}
                                    <path
                                        className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Responsive navigation menu */}
                <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden'}>
                    <div className="pt-2 pb-3 space-y-1">
                        {/* Responsive navigation links */}
                        <ResponsiveNavLink href={route('employee.dashboard',{userId})} active={route().current('employee.dashboard')}>
                            Home Page
                        </ResponsiveNavLink>
                        <ResponsiveNavLink href={route('saved-posts',{userId})} active={route().current('saved-posts')}>
                            Saved Posts
                        </ResponsiveNavLink>
                        <ResponsiveNavLink href={route('my-applications',{userId})} active={route().current('my-applications')}>
                            My Applications
                        </ResponsiveNavLink>
                        {/* Placeholder links for notifications and chat */}
                        <ResponsiveNavLink href="#" active={false}>
                            Notifications
                        </ResponsiveNavLink>
                        <ResponsiveNavLink href="#" active={false}>
                            Chat
                        </ResponsiveNavLink>
                    </div>

                    {user && (
                        <div className="pt-4 pb-1 border-t border-gray-200">
                            <div className="px-4">
                                {/* User profile info */}
                                <div className="font-medium text-base text-gray-800">{user.name}</div>
                                <div className="font-medium text-sm text-gray-500">{user.email}</div>
                            </div>
                            {/* Profile and logout links */}
                            <div className="mt-3 space-y-1">
                                <ResponsiveNavLink href={user.role === 'employee' ? route('employee.profile.edit') : route('company.profile.edit')}>Profile</ResponsiveNavLink>
                                <ResponsiveNavLink method="post" href={route('logout')} as="button" className='text-red-500'>
                                    Log Out
                                </ResponsiveNavLink>
                            </div>
                        </div>
                    )}
                </div>
            </nav>

            {/* Optional header section */}
            {header && (
                <header className="bg-white shadow">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">{header}</div>
                </header>
            )}

            {/* Main content section */}
            <main>{children}</main>
        </div>
    );
}
