import React from 'react';
import { useLocation } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import NotificationStack from '../common/Notification';

export function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div className="min-h-screen flex flex-col bg-cream text-text-main">
      {/* Thanh điều hướng (Header) hiển thị ở Trang chủ, ẩn khi đã vào các tab */}
      {isHomePage && <Header />}

      <main className="flex-1">
        {children}
      </main>
      <Footer />
      <NotificationStack />
    </div>
  );
}
