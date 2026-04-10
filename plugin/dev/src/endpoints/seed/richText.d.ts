type RichTextChild = {
    [k: string]: unknown;
    type: string;
    version: number;
};
type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4';
export declare const heading: (text: string, tag?: HeadingTag) => RichTextChild;
export declare const paragraph: (text: string) => RichTextChild;
export declare const richTextRoot: (...children: RichTextChild[]) => {
    root: {
        type: string;
        children: RichTextChild[];
        direction: "ltr" | "rtl" | null;
        format: "";
        indent: number;
        version: number;
    };
};
export declare const plainRichText: (text: string) => {
    root: {
        type: string;
        children: RichTextChild[];
        direction: "ltr" | "rtl" | null;
        format: "";
        indent: number;
        version: number;
    };
};
export declare const lexicalBlock: (fields: Record<string, unknown>) => {
    type: string;
    fields: Record<string, unknown>;
    format: "";
    version: number;
};
export {};
