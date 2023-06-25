import React, { useState } from 'react';
import Link from 'next/link';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { AiFillHome, AiOutlineMenu,  AiOutlineUpload } from 'react-icons/ai';
import { RiAdvertisementLine } from 'react-icons/ri'
import { ImCancelCircle } from 'react-icons/im';
import Profile from './Profile';

interface SidebarProps {
  isAuthenticated: boolean;
}


const Sidebar: NextPage<SidebarProps> = ({ isAuthenticated }) => {
  const [displaySidebar, setDisplaySidebar] = useState(true);
  const { pathname } = useRouter();
  const activeLink =
    'flex items-center gap-3 hover:bg-primary p-3 justify-center xl:justify-start cursor-pointer font-semibold text-[#F51997] rounded';
  const normalLink = 'flex items-center gap-3 hover:bg-primary p-3 justify-center xl:justify-start cursor-pointer font-semibold rounded';

  return (
    <div>
      <div
        className="cursor-pointer block xl:hidden m-2 ml-4 mt-3 text-xl"
        onClick={() => setDisplaySidebar(!displaySidebar)}
      >
        {displaySidebar ? <ImCancelCircle /> : <AiOutlineMenu />}
      </div>
      {displaySidebar && (
        <div className="xl:w-250 w-20 flex flex-col justify-start mb-10 border-r-2 border-gray-100 xl:border-0p-3 ">
          <div className="xl:border-b-2 border-gray-200 xl:pb-4">
            <Link href="/">
              <div className={pathname === '/' ? activeLink : normalLink}>
                <p className="text-2xl">
                  <AiFillHome />
                </p>
                <span className="capitalize font-montserrat text-xl hidden xl:block py-1">For You</span>
              </div>
            </Link>
          </div>
          {isAuthenticated && (
            <>
              <div className={pathname === '/profile' ? activeLink : normalLink}>
                <Profile />
              </div>
              <Link href="/upload">
                <div className={pathname === '/upload' ? activeLink : normalLink}>
                  <p className="text-2xl">
                    <AiOutlineUpload />
                  </p>
                  <span className="capitalize font-montserrat text-xl hidden xl:block">Upload</span>
                </div>
              </Link>

              <Link href="/ads">
                <div className={pathname === '/ads' ? activeLink : normalLink}>
                  <p className="text-2xl">
                    <RiAdvertisementLine />
                  </p>
                  <span className="capitalize font-montserrat text-xl hidden xl:block">Upload</span>
                </div>
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Sidebar;