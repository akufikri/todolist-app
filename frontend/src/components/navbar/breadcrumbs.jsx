import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "../ui/breadcrumb";
export function Breadcrumbs() {
      const location = useLocation();
      const pathnames = location.pathname.split('/').filter((x) => x);

      return (
            <Breadcrumb className="hidden md:flex mb-4">
                  <BreadcrumbList>
                        <BreadcrumbItem>
                              <BreadcrumbLink as={Link} to="/">
                                    Beranda
                              </BreadcrumbLink>
                        </BreadcrumbItem>
                        {pathnames.map((name, index) => {
                              const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
                              const isLast = index === pathnames.length - 1;
                              return (
                                    <React.Fragment key={routeTo}>
                                          <BreadcrumbSeparator />
                                          <BreadcrumbItem>
                                                {isLast ? (
                                                      <BreadcrumbPage>{name}</BreadcrumbPage>
                                                ) : (
                                                      <BreadcrumbLink as={Link} to={routeTo}>
                                                            {name}
                                                      </BreadcrumbLink>
                                                )}
                                          </BreadcrumbItem>
                                    </React.Fragment>
                              );
                        })}
                  </BreadcrumbList>
            </Breadcrumb>
      );
}