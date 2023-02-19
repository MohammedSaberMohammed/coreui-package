const AttachmentField = () =>
  import(
    "./AttachmentField/attachmentField.vue" /* webpackChunkName: AttachmentField */
  );
const Calendar = () =>
  import("./Calendar/calendar.vue" /* webpackChunkName: Calendar */);
const CardPanel = () =>
  import("./CardPanel/cardPanel.vue" /* webpackChunkName: CardPanel */);
const DataTable = () =>
  import("./DataTable/DataTable.vue" /* webpackChunkName: DataTable */);
const EmptyPlaceholder = () =>
  import(
    "./EmptyPlaceholder/emptyPlaceholder.vue" /* webpackChunkName: EmptyPlaceholder */
  );
const ImageCropper = () =>
  import(
    "./ImageCropper/imageCropper.vue" /* webpackChunkName: ImageCropper */
  );
const LabelAndValue = () =>
  import(
    "./LabelAndValue/labelAndValue.vue" /* webpackChunkName: LabelAndValue */
  );
const PaginationLayout = () =>
  import(
    "./PaginationLayout/paginationLayout.vue" /* webpackChunkName: PaginationLayout */
  );
const Svgs = () => import("./Svgs/nSvg.vue" /* webpackChunkName: Svgs */);

export {
  AttachmentField,
  Calendar,
  CardPanel,
  DataTable,
  EmptyPlaceholder,
  ImageCropper,
  LabelAndValue,
  PaginationLayout,
  Svgs,
};
