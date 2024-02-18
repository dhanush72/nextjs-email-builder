import Logo from '@public/images/logo.svg';
import { Metadata } from 'next';

enum MODE {
  DARK = 'dark',
  LIGHT = 'light',
}

export const siteConfig = {
  title: 'Email Builder',
  description:
    'Next.js Email Builder simplifies the process of creating and customizing email templates within Next.js applications, empowering developers and designers to deliver engaging and visually appealing email communications efficiently.',
  logo: Logo,
  icon: '',
  mode: MODE.LIGHT,
};

export const metaObject = (
  title?: string,
  description: string = siteConfig.description,
): Metadata => {
  return {
    title: title ? `${title} - Email Builder` : title,
    description,
  };
};
