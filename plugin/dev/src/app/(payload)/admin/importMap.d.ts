export const importMap: {
    "@payloadcms/richtext-lexical/rsc#RscEntryLexicalCell": import("react").FC<import("node_modules/@payloadcms/richtext-lexical/dist/types.js").LexicalRichTextCellProps>;
    "@payloadcms/richtext-lexical/rsc#RscEntryLexicalField": import("react").FC<{
        sanitizedEditorConfig: import("@payloadcms/richtext-lexical").SanitizedServerEditorConfig;
    } & import("payload").ClientComponentProps & Pick<import("payload").FieldPaths, "path"> & Pick<import("@payloadcms/richtext-lexical").LexicalEditorProps, "admin"> & import("payload").ServerComponentProps>;
    "@payloadcms/richtext-lexical/rsc#LexicalDiffComponent": import("payload").RichTextFieldDiffServerComponent;
    "@payloadcms/richtext-lexical/client#InlineToolbarFeatureClient": import("@payloadcms/richtext-lexical").FeatureProviderProviderClient<undefined, undefined>;
    "@payloadcms/richtext-lexical/client#FixedToolbarFeatureClient": import("@payloadcms/richtext-lexical").FeatureProviderProviderClient<import("node_modules/@payloadcms/richtext-lexical/dist/features/toolbars/fixed/server/index.js").FixedToolbarFeatureProps, import("node_modules/@payloadcms/richtext-lexical/dist/features/toolbars/fixed/server/index.js").FixedToolbarFeatureProps>;
    "@payloadcms/richtext-lexical/client#HeadingFeatureClient": import("@payloadcms/richtext-lexical").FeatureProviderProviderClient<import("@payloadcms/richtext-lexical").HeadingFeatureProps, import("@payloadcms/richtext-lexical").HeadingFeatureProps>;
    "@payloadcms/richtext-lexical/client#ParagraphFeatureClient": import("@payloadcms/richtext-lexical").FeatureProviderProviderClient<undefined, undefined>;
    "@payloadcms/richtext-lexical/client#UnderlineFeatureClient": import("@payloadcms/richtext-lexical").FeatureProviderProviderClient<undefined, undefined>;
    "@payloadcms/richtext-lexical/client#BoldFeatureClient": import("@payloadcms/richtext-lexical").FeatureProviderProviderClient<undefined, undefined>;
    "@payloadcms/richtext-lexical/client#ItalicFeatureClient": import("@payloadcms/richtext-lexical").FeatureProviderProviderClient<undefined, undefined>;
    "@payloadcms/richtext-lexical/client#LinkFeatureClient": import("@payloadcms/richtext-lexical").FeatureProviderProviderClient<import("node_modules/@payloadcms/richtext-lexical/dist/features/link/client/index.js").ClientProps, import("node_modules/@payloadcms/richtext-lexical/dist/features/link/client/index.js").ClientProps>;
    "@payloadcms/next/client#SlugField": import("react").FC<import("payload").SlugFieldClientProps>;
    "@payloadcms/richtext-lexical/client#HorizontalRuleFeatureClient": import("@payloadcms/richtext-lexical").FeatureProviderProviderClient<undefined, undefined>;
    "@payloadcms/richtext-lexical/client#BlocksFeatureClient": import("@payloadcms/richtext-lexical").FeatureProviderProviderClient<undefined, any>;
    "@payloadcms/next/rsc#FolderTableCell": (props: import("payload").DefaultServerCellComponentProps) => React.JSX.Element;
    "@payloadcms/next/rsc#FolderField": (props: import("payload").RelationshipFieldServerProps) => import("react").JSX.Element;
    "@payloadcms/next/client#FolderTypeField": (props: import("payload").SelectFieldClientProps) => React.JSX.Element;
    "@/Header/RowLabel#RowLabel": any;
    "@/Footer/RowLabel#RowLabel": any;
    "/src/graphics/Icon/index.tsx#Icon": () => import("react/jsx-runtime").JSX.Element;
    "/src/graphics/Logo/index.tsx#Logo": () => import("react/jsx-runtime").JSX.Element;
    "@/components/BeforeDashboard#default": any;
    "@/components/BeforeLogin#default": any;
    "@payloadcms/next/rsc#CollectionCards": typeof CollectionCards_f9c02e79a4aed9a3924487c0cd4cafb1;
};
import { CollectionCards as CollectionCards_f9c02e79a4aed9a3924487c0cd4cafb1 } from '@payloadcms/next/rsc';
