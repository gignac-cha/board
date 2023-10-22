declare interface RemarkPositionDetail {
  line: number;
  column: number;
  offset: number;
}
declare interface RemarkPosition {
  start: RemarkPositionDetail;
  end: RemarkPositionDetail;
}

declare interface RemarkNodeWithPosition {
  position: RemarkPosition;
}
declare interface RemarkNodeWithChildren {
  children: RemarkChild[];
}

declare interface RemarkRoot
  extends RemarkNodeWithPosition,
    RemarkNodeWithChildren {
  type: 'root';
}
declare interface RemarkHeading extends RemarkNodeWithPosition {
  type: 'heading';
  depth: number;
}
declare interface RemarkText extends RemarkNodeWithPosition {
  type: 'text';
  value: string;
}
declare interface RemarkParagraph
  extends RemarkNodeWithPosition,
    RemarkNodeWithChildren {
  type: 'paragraph';
}
declare interface RemarkStrong
  extends RemarkNodeWithPosition,
    RemarkNodeWithChildren {
  type: 'strong';
}
declare interface RemarkEmphasis
  extends RemarkNodeWithPosition,
    RemarkNodeWithChildren {
  type: 'emphasis';
}
// custom
declare interface RemarkStrikethrough
  extends RemarkNodeWithPosition,
    RemarkNodeWithChildren {
  type: 'strikethrough';
}
declare interface RemarkBlockquote
  extends RemarkNodeWithPosition,
    RemarkNodeWithChildren {
  type: 'blockquote';
}
declare interface RemarkLink
  extends RemarkNodeWithPosition,
    RemarkNodeWithChildren {
  type: 'link';
  title: string;
  url: string;
}
declare interface RemarkInlineCode extends RemarkNodeWithPosition {
  type: 'inlineCode';
  value: string;
}
declare interface RemarkCode extends RemarkNodeWithPosition {
  type: 'code';
  lang: string;
  meta: unknown;
  value: string;
}
declare interface RemarkList
  extends RemarkNodeWithPosition,
    RemarkNodeWithChildren {
  type: 'list';
  ordered: boolean;
  start: number;
  spread: boolean;
}
declare interface RemarkListItem
  extends RemarkNodeWithPosition,
    RemarkNodeWithChildren {
  type: 'listItem';
  checked: boolean;
  start: number;
  spread: boolean;
}
declare interface RemarkImage extends RemarkNodeWithPosition {
  type: 'image';
  title: string;
  alt: string;
  url: string;
}
declare interface RemarkThematicBreak extends RemarkNodeWithPosition {
  type: 'thematicBreak';
}

declare type RemarkChild =
  | RemarkHeading
  | RemarkText
  | RemarkParagraph
  | RemarkStrong
  | RemarkEmphasis
  | RemarkStrikethrough
  | RemarkBlockquote
  | RemarkLink
  | RemarkInlineCode
  | RemarkCode
  | RemarkList
  | RemarkListItem
  | RemarkImage
  | RemarkThematicBreak;

declare type RemarkParent =
  | RemarkRoot
  | Extract<RemarkChild, { children: RemarkChild[] }>;

declare type RemarkNode = RemarkRoot | RemarkParent | RemarkChild;
