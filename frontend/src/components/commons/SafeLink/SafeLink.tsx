import NextLink, { LinkProps } from "next/link";
import { AnchorHTMLAttributes, forwardRef, ReactNode } from "react";

interface SafeLinkProps
    extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href">,
        LinkProps {
    href: LinkProps["href"];
    children: ReactNode;
    className?: string;
    textValue?: string;
}
const SafeLink = forwardRef<HTMLAnchorElement, SafeLinkProps>(
    ({ children, textValue, href, ...props }, ref) => {
        return (
            <NextLink href={href} {...props} ref={ref}>
                {children}
            </NextLink>
        );
    },
);

SafeLink.displayName = "SafeLink";
export default SafeLink;
