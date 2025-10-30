import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar/Sidebar';
import TopHeader from '../components/Header/TopHeader';
import './MainLayout.css';

const MainLayout = () => {
  return (
    <div className="main-layout">
      <Sidebar />
      <div className="main-content">
        <TopHeader />
        <div className="content-area">
          <Outlet /> {/* Esto renderiza las páginas hijas */}
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
