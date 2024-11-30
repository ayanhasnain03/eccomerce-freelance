import { Fragment, useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from "@headlessui/react";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  UserIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { navigation } from "../../constants/Navigation";
import { Link } from "react-router-dom";
import {  FaSignOutAlt, FaUser } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";

export default function Header() {
  const [open, setOpen] = useState(false);
  const user = {
    _id: "",
    role: "admin",
  };
  return (
    <div className="bg-white w-screen ">
      {/* Mobile menu */}
      <Dialog open={open} onClose={setOpen} className="relative z-40 lg:hidden">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-black/25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
        />

        <div className="fixed inset-0 z-40 flex">
          <DialogPanel
            transition
            className="relative flex w-full max-w-xs transform flex-col overflow-y-auto bg-white pb-12 shadow-xl transition duration-300 ease-in-out data-[closed]:-translate-x-full"
          >
            <div className="flex px-4 pb-2 pt-5">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
              >
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="size-6" />
              </button>
            </div>

            {/* Links */}
            <TabGroup className="mt-2">
              <div className="border-b border-gray-200">
                <TabList className="-mb-px flex space-x-8 px-4">
                  {navigation.categories.map((category) => (
                    <Tab
                      key={category.name}
                      className="flex-1 whitespace-nowrap border-b-2 border-transparent px-1 py-4 text-base font-medium text-gray-900 data-[selected]:border-indigo-600 data-[selected]:text-indigo-600"
                    >
                      {category.name}
                    </Tab>
                  ))}
                </TabList>
              </div>
              <TabPanels as={Fragment}>
                {navigation.categories.map((category) => (
                  <TabPanel
                    key={category.name}
                    className="space-y-10 px-4 pb-8 pt-10"
                  >
                    <div className="grid grid-cols-2 gap-x-4">
                      {category.featured.map((item) => (
                        <div key={item.name} className="group relative text-sm">
                          <img
                            alt={item.imageAlt}
                            src={item.imageSrc}
                            className="aspect-square w-full rounded-lg bg-gray-100 object-cover group-hover:opacity-75"
                          />
                          <a
                            href={item.href}
                            className="mt-6 block font-medium text-gray-900"
                          >
                            <span
                              aria-hidden="true"
                              className="absolute inset-0 z-10"
                            />
                            {item.name}
                          </a>
                          <p aria-hidden="true" className="mt-1">
                            Shop now
                          </p>
                        </div>
                      ))}
                    </div>
                    {category.sections.map((section) => (
                      <div key={section.name}>
                        <p
                          id={`${category.id}-${section.id}-heading-mobile`}
                          className="font-medium text-gray-900"
                        >
                          {section.name}
                        </p>
                        <ul
                          role="list"
                          aria-labelledby={`${category.id}-${section.id}-heading-mobile`}
                          className="mt-6 flex flex-col space-y-6"
                        >
                          {section.items.map((item) => (
                            <li key={item.name} className="flow-root">
                              <a
                                href={item.href}
                                className="-m-2 block p-2 text-gray-500"
                              >
                                {item.name}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </TabPanel>
                ))}
              </TabPanels>
            </TabGroup>

            <div className="space-y-6 border-t border-gray-200 px-4">
           <p className="text-base font-medium text-gray-900">
             Customer Service
           </p>
              {navigation.pages.map((page) => (
                <div key={page.name} className="flow-root">
                  <a
                    href={page.href}
                    className="-m-2 block text-xs p-2 font-semibold text-gray-700"
                  >
                    {page.name}
                  </a>
                </div>
              ))}
            </div>

            <div className="space-y-6 border-t border-gray-200 mx-auto px-4 py-6">
              <div className="relative">
                {user && user._id ? (
                  <div className="flex flex-col gap-4">
                    <button>
                      <Link
                        to={`/profile/${user?._id}`}
                        className="-m-2  p-2 font-medium text-gray-900 flex items-center flex-col gap-2"
                      >
                        <FaUser />
                        <span>Profile</span>
                      </Link>
                    </button>

                    {user.role === "admin" && (
                      <button >
                        <Link
                          to="/admin"
                          className="-m-2  p-2 font-medium text-gray-900 flex items-center flex-col gap-2"
                        >
                          <MdDashboard />
                          <span>Dashboard</span>
                        </Link>
                      </button>
                    )}


                    <button
                      onClick={() => console.log("logout")}
                      className="-m-2  p-2 font-medium text-gray-900 flex items-center flex-col gap-2"
                    >
                      <FaSignOutAlt />
                      <span>Logout</span>
                    </button>
                  </div>
                ) : (
                  <Link
                    to="/login"
                    className="-m-2 block p-2 font-medium text-gray-900"
                  >
                    Login
                  </Link>
                )}
              </div>

              <div></div>
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      <header className="relative bg-white w-full">
        <p className="flex h-10 items-center justify-center bg-indigo-600 px-4 text-sm font-medium w-full text-white sm:px-6 lg:px-8">
          Get free delivery on orders over $100
        </p>

        <nav
          aria-label="Top"
          className="flex w-full  items-center justify-between border-b border-gray-200"
        >
          <div className="border-b border-gray-200 w-full">
            <div className="flex h-16 items-center justify-between px-4">
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="relative rounded-md bg-white p-2 text-gray-400 lg:hidden"
              >
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open menu</span>
                <Bars3Icon aria-hidden="true" className="size-6" />
              </button>

              {/* Logo */}
              <div className="ml-4 flex lg:ml-0">
                <a href="#">
                  <span className="sr-only">Your Company</span>
                  <img
                    alt=""
                    src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
                    className="h-8 w-auto"
                  />
                </a>
              </div>

              {/* Flyout menus */}
              <PopoverGroup className="hidden lg:ml-8 lg:block lg:self-stretch">
                <div className="flex h-full space-x-8">
                  {navigation.categories.map((category) => (
                    <Popover key={category.name} className="flex">
                      <div className="relative flex">
                        <PopoverButton className="relative z-10 -mb-px flex items-center border-b-2 border-transparent pt-px text-sm font-medium text-gray-700 transition-colors duration-200 ease-out hover:text-gray-800 data-[open]:border-indigo-600 data-[open]:text-indigo-600">
                          {category.name}
                        </PopoverButton>
                      </div>

                      <PopoverPanel
                        transition
                        className="absolute inset-x-0 top-full text-sm text-gray-500 transition data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
                      >
                        {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                        <div
                          aria-hidden="true"
                          className="absolute inset-0 top-1/2 bg-white shadow"
                        />

                        <div className="relative bg-white">
                          <div className="mx-auto max-w-7xl px-8">
                            <div className="grid grid-cols-2 gap-x-8 gap-y-10 py-16">
                              <div className="col-start-2 grid grid-cols-2 gap-x-8">
                                {category.featured.map((item) => (
                                  <div
                                    key={item.name}
                                    className="group relative text-base sm:text-sm"
                                  >
                                    <img
                                      alt={item.imageAlt}
                                      src={item.imageSrc}
                                      className="aspect-square w-full rounded-lg bg-gray-100 object-cover group-hover:opacity-75"
                                    />
                                    <a
                                      href={item.href}
                                      className="mt-6 block font-medium text-gray-900"
                                    >
                                      <span
                                        aria-hidden="true"
                                        className="absolute inset-0 z-10"
                                      />
                                      {item.name}
                                    </a>
                                    <p aria-hidden="true" className="mt-1">
                                      Shop now
                                    </p>
                                  </div>
                                ))}
                              </div>
                              <div className="row-start-1 grid grid-cols-3 gap-x-8 gap-y-10 text-sm">
                                {category.sections.map((section) => (
                                  <div key={section.name}>
                                    <p
                                      id={`${section.name}-heading`}
                                      className="font-medium text-gray-900"
                                    >
                                      {section.name}
                                    </p>
                                    <ul
                                      role="list"
                                      aria-labelledby={`${section.name}-heading`}
                                      className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                    >
                                      {section.items.map((item) => (
                                        <li key={item.name} className="flex">
                                          <a
                                            href={item.href}
                                            className="hover:text-gray-800"
                                          >
                                            {item.name}
                                          </a>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </PopoverPanel>
                    </Popover>
                  ))}

                  {navigation.pages.map((page) => (
                    <a
                      key={page.name}
                      href={page.href}
                      className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                    >
                      {page.name}
                    </a>
                  ))}
                </div>
              </PopoverGroup>

              <div className="flex items-center">
                {/* Search */}
                <div className="flex lg:ml-6">
                  <a href="#" className="p-2 text-gray-400 hover:text-gray-500">
                    <span className="sr-only">Search</span>
                    <MagnifyingGlassIcon
                      aria-hidden="true"
                      className="w-6 h-6"
                    />
                  </a>
                </div>

                {/* Cart */}
                <div className="ml-4 flow-root lg:ml-6 relative">
                  <a
                    href="#"
                    className="group -m-2 flex items-center p-2 relative"
                  >
                    <ShoppingBagIcon
                      aria-hidden="true"
                      className="w-6 h-6 shrink-0 text-gray-400 group-hover:text-gray-500"
                    />
                    <span
                      className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-semibold h-5 w-5 flex items-center justify-center rounded-full"
                      aria-label="Cart items count"
                    >
                      0
                    </span>
                  </a>
                </div>

                {/* Login */}
                <div className="hidden md:flex lg:ml-8">
                  <Link
                    to={`${user && user._id ? `/profile/${user._id}` : `/login`}`}
                    className="p-2 text-gray-400 hover:text-gray-500"
                    aria-label="Login"
                  >
                    <UserIcon
                      aria-hidden="true"
                      className="w-6 h-6 shrink-0 text-gray-400 hover:text-gray-500"
                    />
                  </Link>
                </div>

                {/* Mobile Menu Button */}
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}
