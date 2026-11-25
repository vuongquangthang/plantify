import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ArrowLeft } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface PageHeaderProps {
  badge?: string;
  badgeIcon?: React.ReactNode;
  title?: string;
  description?: string;
  breadcrumbs?: BreadcrumbItem[];
  children?: React.ReactNode;
  align?: 'left' | 'center';
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  breadcrumbs,
  children,
  align = 'left',
}) => {
  return (
    <div className="relative bg-gradient-to-r from-[#173825] via-[#204E35] to-[#1A3F2B] text-white overflow-hidden border-b border-[#28643E]/30 py-4 sm:py-5 shadow-xs">
      {/* Subtle organic ambient glow */}
      <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-emerald-400/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

      <div className="container-custom relative z-10">
        {/* Breadcrumbs & Quick Back */}
        <div className="flex items-center gap-3 mb-2">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs text-emerald-200/90 hover:text-white px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/15 backdrop-blur-sm border border-white/10 transition-colors"
            title="Quay lại Trang chủ"
          >
            <ArrowLeft className="w-3 h-3 text-emerald-300" />
            <span>Trang chủ</span>
          </Link>

          {breadcrumbs && breadcrumbs.length > 0 && (
            <nav className="flex items-center gap-1 text-xs text-emerald-200/70" aria-label="Breadcrumb">
              {breadcrumbs.map((crumb, idx) => (
                <React.Fragment key={idx}>
                  <ChevronRight className="w-3 h-3 text-emerald-300/40" />
                  {crumb.href ? (
                    <Link to={crumb.href} className="hover:text-white transition-colors">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-white font-medium">{crumb.label}</span>
                  )}
                </React.Fragment>
              ))}
            </nav>
          )}
        </div>

        <div className={`flex flex-col ${align === 'center' ? 'items-center text-center' : 'md:flex-row md:items-center md:justify-between'} gap-3`}>
          <div>
            <h1 className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-white leading-tight">
              {title}
            </h1>
          </div>

          {children && (
            <div className={`flex items-center gap-3 flex-shrink-0 flex-wrap ${align === 'center' ? 'mt-2 justify-center' : ''}`}>
              {children}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
