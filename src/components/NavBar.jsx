import React from 'react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from '@chakra-ui/react';
import SortIcon from "./icons/SortIcon";

const NavBar = ({ breadcrumbs }) => {
  return (
    <Breadcrumb spacing="8px" separator={<SortIcon color='gray.500'/>}>
      {breadcrumbs.map((breadcrumb, index) => (
        <BreadcrumbItem key={index}>
          <BreadcrumbLink href={breadcrumb.link}>
            {breadcrumb.label}
          </BreadcrumbLink>
        </BreadcrumbItem>
      ))}
    </Breadcrumb>
  );
};

export default NavBar;
