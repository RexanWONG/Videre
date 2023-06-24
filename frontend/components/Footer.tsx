import React from 'react';
import { NextPage } from 'next';
import { footerCompany, footerSupport, footerLegal } from './data/constant';

const List = ({ items, mt }: { items: string[], mt: Boolean }) => (
  <div className={`flex flex-wrap gap-2 ${mt && 'mt-5'}`}>
    {items.map((item: string) => (
      <p key={item} className='text-gray-400 text-sm  hover:underline cursor-pointer' >
        {item}
      </p>
    ))}
  </div>
);
const Header = ({ title, mt }: { title: string, mt: Boolean }) => (
    <div className={`flex flex-wrap gap-2 ${mt && 'mt-5'}`}>
        <p key={title} className='text-gray-500 text-sm ' >
          {title}
        </p>
    </div>
  );
const Footer: NextPage = () => (
  <div className='mt-6 font-raleway hidden xl:block'>
    <Header title = "Company" mt = {false} />
    <List items={footerCompany} mt = {false} />
    <Header title = "Support" mt />
    <List items={footerSupport} mt = {false} />
    <Header title = "Legal" mt />
    <List items={footerLegal} mt = {false} />
    <p className='text-gray-400 text-sm mt-5'>© 2023 Videre</p>
  </div>
);

export default Footer;