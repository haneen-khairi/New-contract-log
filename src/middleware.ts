import createMiddleware from "next-intl/middleware";
import { withAuth } from 'next-auth/middleware';
import { NextRequest } from 'next/server';

const locales = ['en', 'ar'];
const publicPages = ['/', '/pricing', '/login', "/register", "/forget-password"];

const intlMiddleware = createMiddleware({
    locales,
    defaultLocale: "en",
});

const authMiddleware = withAuth(
    function onSuccess(req) {
        return intlMiddleware(req);
    },
    {
        callbacks: {
            authorized: ({ token }) => token != null
        },
        pages: {
            signIn: '/en/login'
        }
    }
);

export default function middleware(req: NextRequest) {
    const publicPathnameRegex = RegExp(
        `^(/(${locales.join('|')}))?(${publicPages.join('|')})?/?$`,
        'i'
    );
    const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname);

    if (isPublicPage) {
        return intlMiddleware(req);
    } else {
        return (authMiddleware as any)(req);
    }
}

export const config = {
    // Match only internationalized pathnames
    matcher: ["/", "/(ar|en)/:path*"],
};
