import type { RefObject } from 'react';
type UseClickableCardType<T extends HTMLElement> = {
    card: {
        ref: RefObject<T | null>;
    };
    link: {
        ref: RefObject<HTMLAnchorElement | null>;
    };
};
interface Props {
    external?: boolean;
    newTab?: boolean;
    scroll?: boolean;
}
declare function useClickableCard<T extends HTMLElement>({ external, newTab, scroll, }: Props): UseClickableCardType<T>;
export default useClickableCard;
