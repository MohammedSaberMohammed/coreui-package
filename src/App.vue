<template>
  <v-app>
    <v-container>
      <v-form>
        <attachment-field
          label="صورة شخصية "
          name="association"
          placeholder="قم بسحب وإرفاق ملفاتك في هذه المنطقة"
          is-required
          is-multiple
          :value="serverSideValue"
          :localizations="localizations"
          enable-server-side
          activate-internal-error-preview
          :attachment-type-id="5"
          :max-files-size-in-mega="10"
          :upload-callback="onUploadData"
          :download-callback="onGenerateFileFromSharepointId"
          choose-file-action-id="testId"
          :rules="formValidators.attachments"
          @select="onSelectFiles"
          @error="onErrorFound"
        />

        <calendar
          color="primary"
          label="تصفية بالتاريخ"
          :row="true"
          :range="true"
          :hijri="isHijri"
          :value="date"
          hint="يرجى ادخال فترة زمنية"
          dense
          :rules="formValidators.calendar"
          @change="changeDate"
          @changeHijri="changeHijriState"
        />

        <image-cropper
          label="نص تجريبي"
          name="personalInfo"
          is-required
          :value="imageValue"
          :cropper-configs="cropperConfigs"
          :upload-callback="onUploadData"
          :download-callback="onGenerateFileFromSharepointId"
          hint="hint placeholder"
          enable-download
          enable-server-side
          update-parent-with-file-meta
          :rules="formValidators.imageCropper"
          @cropImage="onCropImage"
        />
      </v-form>

      <card-panel title="تجربة">
        <template #headerAction>
          <v-btn color="red" class="white--text"> الغاء </v-btn>
        </template>
      </card-panel>

      <data-table
        :rows="rows"
        :columns="columns"
        :on-click="onRowClicked"
        :primary-field="primaryField"
      >
        <template #dateTime="{ data: { row }, currentClass }">
          <label-and-value
            :class="currentClass"
            :label="$t('appointmentDateAndTime')"
            :value="row.dateTime"
            value-class="label-and-value-value"
          />
        </template>

        <template #actions="{ data: { row }, currentClass }">
          <label-and-value :class="currentClass">
            <template #value>
              <v-btn
                v-if="row.pendingApproval && !row.isCancelled"
                outlined
                color="error"
                @click="openCancelDialog(row)"
              >
                {{ $t("cancel") }}
              </v-btn>
            </template>
          </label-and-value>
        </template>
      </data-table>

      <empty-placeholder
        :primary-text="primaryText"
        :secondary-text="secondaryText"
        :is-loading="isLoading"
        icon="mdi-check"
      >
        <template #icon>
          <n-svg name="map" />
        </template>
      </empty-placeholder>

      <pagination-layout
        :value="paginationValue"
        server-page-number-key="page"
        server-page-size-key="size"
        total-count-key="totalPassengers"
        enable-readable-stream-parse
        :cascade-mode="false"
        data-target-key="data"
        is-direct-data
        :enable-server-side-pagination="false"
        :additional-payload="additionalPayload"
        :page-size-options="[10, 50, 100, 30]"
        :fetch-on-mount="false"
        @search="onSearch"
      >
        <!-- Customize Loading slot -->
        <template #loader>
          <span>Loading ...</span>
        </template>

        <!-- Customize list slot -->
        <template #list="{ data }">
          <p v-for="(item, i) in data" :key="i">
            {{ item.title }}
          </p>
        </template>

        <!-- Customize pagination slot -->
        <!-- <template
        #pagination="{
          data,
          onChangePageSize,
          onFirstPageActionClicked,
          onPreviousPageActionClicked,
          onNextPageActionClicked,
          onLastPageActionClicked,
        }"
      >
        <button
          class="nav-controller"
          :disabled="data.isFirstPageActionDisabled"
          @click="onFirstPageActionClicked"
        >
          الصفحة الأولى
        </button>   
        
        <button
          class="nav-controller"
          :disabled="data.isFirstPageActionDisabled"
          @click="onPreviousPageActionClicked"
        >
          السابق
        </button>   
        
        <button
          class="nav-controller"
          :disabled="data.isLastPageActionDisabled"
          @click="onNextPageActionClicked"
        >
          التالي
        </button>

        <button
          class="nav-controller"
          :disabled="data.isLastPageActionDisabled"
          @click="onLastPageActionClicked"
        >
          الصفحة الأخيرة
        </button>
      </template> -->
      </pagination-layout>
    </v-container>
  </v-app>
</template>

<script>
// Services
import { isRequiredAttachment } from "./services/formValidators";

export default {
  name: "App",
  components: {
    AttachmentField: () =>
      import("./components/AttachmentField/attachmentField.vue"),
    Calendar: () => import("./components/Calendar/calendar.vue"),
    CardPanel: () => import("./components/CardPanel/cardPanel.vue"),
    DataTable: () => import("./components/DataTable/dataTable.vue"),
    LabelAndValue: () => import("./components/LabelAndValue/labelAndValue.vue"),
    EmptyPlaceholder: () =>
      import("./components/EmptyPlaceholder/emptyPlaceholder.vue"),
    ImageCropper: () => import("./components/ImageCropper/imageCropper.vue"),
    PaginationLayout: () =>
      import("./components/PaginationLayout/paginationLayout.vue"),
  },
  data() {
    return {
      // Form
      formValidators: {
        attachments: [isRequiredAttachment],
        calendar: [isRequiredAttachment],
        imageCropper: [isRequiredAttachment],
      },
      // AttachmentField
      localizations: {
        placeholder: "استعراض الملفات",
      },
      serverSideValue: [],
      // Calendar
      isHijri: true,
      date: ["1444-07-08", "1444-07-16"],
      // DataTable
      rows: [
        {
          appointmentID: "Hello",
          dateTime: "Hello",
          serviceTitle: "Hello",
          status: "Hello",
        },
      ],
      primaryField: "appointmentID",
      // EmptyPlaceholder
      primaryText: "تجربة نص",
      secondaryText: "تجربة نص تجربة نص تجربة نص",
      isLoading: true,
      // ImageCropper
      cropperConfigs: {
        aspectRatio: 4 / 6,
      },
      imageValue: {
        attachmentTypeId: 5,
        contentType: "image/png",
        id: 0,
        sharepointId:
          "bPHSUiXuzJLHf2Q7V0vLtRYITqvi9wYk1LYMB7vCxJVhchPoNp4uqsjk2E+pqql4B8hlPlIsuvkdtKbkr40lpA==",
      },
      // PaginationLayout
      additionalPayload: {},
      paginationValue: [
        {
          title: " إصدار وكالة إلكترونيا ",
          description:
            "خدمة تتيح للمستفيدين إصدار وكالة بشكل إلكتروني ويتم اعتمادها مباشرة دون الحاجة إلى زيارة كتابة العدل، وإشعار أطراف الوكالة بصدورها.",
          id: "3472d517-7cb4-4cd5-a6bc-2abc9751eea3",
          rank: "firstRank",
        },
        {
          title: "التحقق من وكالة",
          description:
            "خدمة تتيح للمستفيد التحقق من حالة الوكالة الصادرة من وزارة العدل، بالإضافة إلى إمكانية مشاهدة بنود ونص الوكالة، وتحميل صك الوكالة إلكترونياً.",
          id: "67699648-9709-4d94-8d40-a427c4204fd5",
          rank: "firstRank",
        },
        {
          title: "تسجيل وكالة",
          description:
            "خدمة تتيح للمستفيد تقديم طلب لتسجيل بيانات وكالة ثم يستكمل إصدار الوكالة من خلال زيارة كتابة العدل.",
          id: "40e619cb-a221-44c2-ba99-af7b70c37bd8",
          rank: "firstRank",
        },
        {
          title: "فسخ وكالة إلكترونيًا",
          description:
            "خدمة تتيح للمستفيد فسخ الوكالة إلكترونياً من قبل الموكلين والوكلاء دون الحاجة لزيارة كتابة العدل",
          id: "98936b42-6b58-47e4-932c-c98840010095",
          rank: "firstRank",
        },
        {
          title: "إثبات شهادة",
          description:
            "خدمة تتيح للمستفيد تقديم طلب لإثبات شهادته بموضوع محدد لدى المحكمة خشية حصول ما يمنع حضوره للشهادة على ذات الموضوع عند طلب شهادته.",
          id: "1271c7eb-3734-4106-9894-b19d5261f5cc",
          rank: "firstRank",
        },
      ],
    };
  },
  computed: {
    columns() {
      return [
        {
          title: this.$t("appointmentNumber"),
          field: "appointmentID",
        },
        {
          title: this.$t("appointmentDateAndTime"),
          field: "dateTime",
        },
        {
          title: this.$t("serviceName"),
          field: "serviceTitle",
        },
        {
          title: this.$t("appointmentStatus"),
          field: "status",
          formatter: ({ status }) => (status ? "فعال" : "غير فعال"),
        },
        {
          title: "",
          field: "actions",
        },
      ];
    },
  },
  mounted() {
    setTimeout(() => {
      this.isLoading = false;
    }, 3000);
  },
  methods: {
    // AttachmentField
    async onSelectFiles(file) {
      console.log(file);
      this.serverSideValue = file.value;
    },
    async onUploadData(data) {
      console.log("onUploadData", data);
      return `test${Math.random()}test+pqql4B8hlPlIsuvkdtKbkr40lpA==`;
    },
    async onGenerateFileFromSharepointId(data) {
      console.log("onUploadData", data);
      return new Promise((resolve) => {
        setTimeout(
          () =>
            resolve(
              new File(["foo"], "foo.txt", {
                type: "image/png",
              })
            ),
          1000
        );
      });
    },
    onErrorFound(error) {
      console.log("error", error);
    },
    getBase64(file) {
      console.log("file", file);
    },
    getAllowedFileTypesText(data) {
      return `نوع الملف يجب أن يكون ${data.allowedExtentions}`;
    },
    getAllowedMaxFileSizeText(data) {
      return `كحد أقصى ${data.maxFilesSizeInMega} م.ب`;
    },
    getFileSizeInKiloByte(sizeInBytes) {
      const sizeInKiloByte = sizeInBytes / 1000;

      return `${sizeInKiloByte}KB`;
    },
    // Calendar
    changeDate(newDate) {
      if (newDate.gregorian.length === 2) {
        this.date = this.isHijri ? newDate.hijri : newDate.gregorian;
        this.filterDate = newDate.gregorian;
      } else {
        this.date = [];
        this.filterDate = [];
      }
    },

    changeHijriState() {
      this.isHijri = !this.isHijri;
    },

    // DataTable
    onRowClicked(row) {
      console.log(row);
    },
    // ImageCropper
    onCropImage(data) {
      console.log("onCropImage", data);
      this.imageValue = data.value;
    },
    // PaginationLayout
    onSearch(data) {
      console.log("onSearch", data);
    },
    changeValue() {
      this.value = [
        {
          title: "إثبات تنازل عن إصابة",
          description:
            "خدمة تتيح للمستفيد تقديم طلب لإثبات تنازل عن إصابة لحقت به، ويتم إثبات التنازل لدى المحكمة.",
          id: "71d9425c-c484-4f28-9a83-d41930561df4",
          rank: "firstRank",
        },
        {
          title: "توثيق الإستحقاق لتمويل الزواج",
          description:
            "خدمة تتيح للمستفيد من تقديم طلب لتوثيق استحقاق لتمويل الزواج وتقديمه إلى الجهة المعينة التي تطلبه.",
          id: "d1a4165a-aca9-45ed-92ae-a4e3d97d5696",
          rank: "firstRank",
        },
        {
          title: "إثبات فقد وغيبة",
          description:
            "خدمة تتيح للمستفيد لتقديم طلب لإثبات تغيب أحد الأشخاص لدى المحكمة.",
          id: "065f0649-4eab-400c-8bac-f2a14e35ef02",
          rank: "firstRank",
        },
        {
          title: "قسمة تركة",
          description:
            "خاص بالدعاوى المقامة من أحد الورثة أو أكثر ضد البقية بطلب تسليم النصيب الشرعي من عقار المورث، أو الدعاوى المقامة من أحد الورثة أو أكثر ضد البقية بطلب تسليم النصيب الشرعي من تركة المورث المالية النقد، أو الأسهم، أو الأثمان، أو المنقول. ",
          id: "0df7a7b7-f6b5-4cf8-8bdd-f640221dfe16",
          rank: "firstRank",
        },
        {
          title: "تسليم مبلغ من المال لمن ثبت رشده  ",
          description:
            "خدمة تتيح للمستفيد في حال ثبت رشده بعد أن كان قاصراً، لتقديم طلب لاستلام أمواله من الهيئة العامة للولاية على أموال القاصرين ومن في حكمهم.",
          id: "762a5ec2-1e8a-4b31-91f4-363ccf866fbe",
          rank: "firstRank",
        },
        {
          title: "إثبات تنازل عن دية أو بعضها ",
          description:
            "خدمة تتيح للمستفيد تقديم طلب لإثبات التنازل عن الدية أو بعض من الدية ، ويتم توثيق التنازل لدى المحكمة.",
          id: "15757d79-f0ea-4e7a-bb6f-20548b407d13",
          rank: "firstRank",
        },
        {
          title: "طلب إصدار حكم حبس",
          description:
            "خدمة تتيح للمستفيد طالب التنفيذ من طلب إصدار حكم الحبس بحق المنفذ ضده حسب الحالات المنصوص عليها في نظام التنفيذ.",
          id: "2864ff7d-88c7-4118-acce-20fdc8060963",
          rank: "firstRank",
        },
        {
          title: "طلب إنهاء السند",
          description:
            "خدمة تتيح للمستفيد طالب التنفيذ من طلب تحويل المبالغ المحجوزة في حساب المنفذ ضده .",
          id: "e375f6d1-3a66-40b2-83bd-3afe037f931b",
          rank: "firstRank",
        },
        {
          title: "إعادة المضبوطات",
          description: "خدمة تتيح لأطراف القضية تقديم طلب إعادة مضبوطات",
          id: "f59154e6-39f1-4cc1-b94e-445355110c27",
          rank: "firstRank",
        },
        {
          title: "تقدير نفقة قاصر",
          description:
            "خدمة تتيح للمستفيد الولي على القاصر لتقديم طلب لتقدير نفقة للقاصر أو لشراء حاجيات له أو استلام أموال للقاصر في حال كانت أموال القاصر مودعة لدى الهيئة العامة للولاية على أموال القاصرين ومن في حكمهم.",
          id: "8909a4c4-f081-41a2-8795-5bcaa6d47bcf",
          rank: "firstRank",
        },
        {
          title: "توثيق وقف",
          description:
            "خدمة تتيح للمستفيد من تقديم طلب لإثبات ما يرغب بجعله وقفاً من أملاكه.",
          id: "b65c996a-fe8e-4c0c-a906-986da7b2b183",
          rank: "firstRank",
        },
        {
          title: "إثبات ناظر على وقف/وصية ",
          description:
            "خدمة تتيح للمستفيد من تقديم طلب لتعيين ناظر وقيّم على الوقف أو الوصية ليدير شؤونه ويشرف عليها",
          id: "9389c548-65e0-46b5-84c6-99527d00b93f",
          rank: "firstRank",
        },
        {
          title: "توثيق حضانة",
          description:
            "خدمة إلكترونية تتيح للحاضنة أو وكيلها تقديم طلب توثيق حضانة أطفالها دون 18 سنة وذلك في حالات محددة  كطلاقها أو تغيب الأب أو مرضه بشرط ألا يكون هناك نزاع على الحضانة.",
          id: "e2560f40-ddf8-4e37-b212-394787344aef",
          rank: "firstRank",
        },
        {
          title: "إنشاء عقد زواج",
          description:
            "خدمة  إنشاء عقد إلكتروني للزواج, بداية من إدخال بيانات المستفيد وجميع الأطراف ثم تقديم الطلب والمصادقة عليه من جميع اطراف العقد, ومن ثم استكمال اعتماده من مأذون الأنكحة ليتم إصدار وثيقة عقد الزواج.",
          id: "3e5e8e63-9a67-4ada-bafb-b16bb6b9f3fd",
          rank: "firstRank",
        },
        {
          title: "فسخ ولاية بطلب من الولي  ",
          description:
            "خدمة تتيح للمستفيد الولي تقديم طلب لإثبات تنازله عن الولاية.",
          id: "cd341367-647c-4d5c-8e7d-463092e91517",
          rank: "firstRank",
        },
        {
          title: "إقامة ولي على قاصر سناً",
          description:
            "خدمة تتيح للمستفيد تقديم طلب استخراج صك ولاية على القاصر سناً - وهو من لم يتم سن الثامنة عشرة - بعد وفاة الأب واستلام صك حصر الورثة.",
          id: "1a6d64bf-1c86-478f-9d98-01be47010358",
          rank: "firstRank",
        },
        {
          title: "توثيق رجعة",
          description:
            "خدمة تتيح للمستفيد تقديم طلب لإثبات مراجعة الزوج لزوجته بعد طلاق رجعي.",
          id: "8f097103-691f-438f-9a20-d492b564965e",
          rank: "firstRank",
        },
        {
          title: "توثيق زواج أحد الزوجين غير سعودي",
          description:
            "خدمة تتيح للمستفيد تقديم طلب لإجراء عقد الزواج لفئات محددة من المجتمع في حال كان أحد الطرفين غير سعودي، أو الزوجين غير ناطقين بالعربية.",
          id: "c5586468-24ca-47e2-81b6-625813dcfba2",
          rank: "firstRank",
        },
        {
          title: "طلب حراسة قضائية",
          description:
            "خدمة تتيح لأطراف القضية تقديم طلب حراسة قضائية على العقار أو المنقول محل النزاع لحين الفصل في القضية.",
          id: "440798cf-6683-4827-902a-4cb66e292c07",
          rank: "firstRank",
        },
        {
          title: "طلب المنع من السفر",
          description:
            "خدمة تتيح للمدعي أو من يمثله تقديم طلب منع أحد المدعى عليهم بالقضية من السفر",
          id: "994d2ab7-5386-490b-ad3f-56466dd1aef0",
          rank: "firstRank",
        },
        {
          title: "طلب تقديم مذكرة الرد على الدعوى وتبادل المذكرات",
          description:
            "خدمة تتيح للمدعى عليه أو من يمثله تقديم مذكرة الرد على ما ورد في الدعوى، بالإضافة إلى تبادل المذكرات إلكترونياً وفقاً لما تقرره الدائرة القضائية.",
          id: "d37abd59-ae3b-4881-9a13-4322bac124e1",
          rank: "firstRank",
        },
        {
          title: "طلب الإفراج",
          description:
            "خدمة تتيح لأطراف القضية تقديم طلب إفراج عن موقوف على ذمة قضية.",
          id: "037a969a-76e4-44b8-aa2c-7ecb2e62cbba",
          rank: "firstRank",
        },
        {
          title: "إقرار القناعة بالحكم",
          description:
            "خدمة تتيح لأطراف القضية تقديم طلب إقرار القناعة بالحكم وبالتالي التنازل عن الحق بالاعتراض على الحكم.",
          id: "46d82ab9-2a86-46d7-8d4d-8d1e79f92893",
          rank: "firstRank",
        },
        {
          title: "طلب إعادة النظر في قضية مشطوبة ",
          description:
            "خدمة تتيح للمدعي أو من يمثله تقديم طلب إعادة النظر في القضية المشطوبة.",
          id: "ff1f9ae8-29dd-4fb9-bd91-04561c321fee",
          rank: "firstRank",
        },
        {
          title: "طلب ايقاف/استمرار السير في دعوى.",
          description:
            "خدمة تتيح للمدعي تقديم طلب إيقاف السير في الدعوى أو إعادة استمرار السير في الدعوى.",
          id: "e7361cdb-a824-441d-959d-07a07da748d9",
          rank: "firstRank",
        },
        {
          title: "طلب إحالة للعفو",
          description:
            "خدمة تتيح للمدعى عليه أو من يمثله تقديم طلب إحالة للعفو.",
          id: "01ab9972-d6f3-4493-8525-155b88cc3adc",
          rank: "firstRank",
        },
        {
          title: "طلب إصدار قرار رفع 46",
          description:
            "خدمة تتيح للمستفيد المنفذ ضده بالمطالبة برفع إجراءات قرار 46 بعد قيامه بتنفيذ كامل السند التنفيذي.",
          id: "38b1d165-53d4-471e-bf38-1fb548c866a2",
          rank: "firstRank",
        },
        {
          title: "صحيفة   الدعوى ",
          description:
            "خدمة تتيح للمستفيد رفع دعوى في أحد المحاكم العامة , الجزائية , الحقوقية , الأحوال الشخصية, التجارية, العمالية",
          id: "928b8f02-19a7-482b-ba0e-29a151d9a900",
          rank: "firstRank",
        },
        {
          title: "طلب إنهاء السند التنفيذي",
          description:
            "خدمة تتيح للمستفيد طالب التنفيذ من تقديم طلب إنهاء السند التنفيذي بسبب الصلح أو التنازل أو استلام المبلغ أو العقار أو المحضون.",
          id: "152ff72e-0c8d-42b2-9f16-3f81e5cf38d2",
          rank: "firstRank",
        },
        {
          title: "طلب تأجيل جلسة",
          description:
            "خدمة تتيح لأطراف القضية تقديم طلب تأجيل الجلسة القادمة بالقضية مع توضيح الأسباب.",
          id: "2e0b7543-ae8e-4e40-a89f-9fae5cdad403",
          rank: "firstRank",
        },
        {
          title: "طلب رد عضو",
          description:
            "خدمة تمكن أحد اطراف القضية أو من يمثلهم تقديم طلب رد عضو لرد القاضي الذي ينظر القضية\n",
          id: "cbbf8b0d-3bec-405e-841d-a334388c8228",
          rank: "firstRank",
        },
        {
          title: "طلب إسقاط وكيل من قضية",
          description:
            "خدمة تتيح لأطراف القضية التقديم طلب إسقاط وكيل من قضية .",
          id: "2b368b50-4b36-4d74-a2eb-f831b3ee61e4",
          rank: "firstRank",
        },
        {
          title: "طلب عارض (مفتوح)",
          description:
            "خدمة تتيح لأطراف القضية تقديم طلب مفتوح يمكن استخدامه في حالة عدم وجود طلب خاص بالخدمة المطلوبة.",
          id: "59ed0cf4-5ac0-4caa-a71b-c4d2fa9c6f05",
          rank: "firstRank",
        },
        {
          title: "استمرار ولاية على القاصر عقلا",
          description:
            "خدمة تتيح للمستفيد تقديم طلب استخراج صك باستمرار الولاية المالية - على من أتم سن الثامنة عشرة - عند وجود مقتض لذلك .",
          id: "255477cd-c821-42ca-88ba-d01eb00fa2a0",
          rank: "firstRank",
        },
        {
          title: "الاعتراض على الحكم",
          description:
            "خدمة تتيح للمستفيدين من تقديم طلب لائحة اعتراضية على حكم أو قرار قضائي صادر من المحكمة، ويجب أن يتضمن الاعتراض رقم الحكم المعارض عليه، وتاريخه وأسباب المعارضة.",
          id: "cba332a0-28b8-4ce0-ab00-ef4ddeb9ab64",
          rank: "firstRank",
        },
        {
          title: "إثبات رشد  ",
          description:
            "خدمة تتيح للمستفيد القاصر تقديم طلب لإثبات رشده، بحيث يتمكن من ولاية نفسه.",
          id: "fe79d687-fe29-43d2-9912-ea0ed164beaf",
          rank: "firstRank",
        },
        {
          title: "إقامة ولي على قاصر عقلاً",
          description:
            "خدمة تتيح للمستفيد تقديم طلب استخراج صك ولاية على القاصر عقلاً .",
          id: "ee79fb55-4344-4586-9325-9c4ef3858ce1",
          rank: "firstRank",
        },
        {
          title: "طلب رفع المنع من السفر",
          description:
            "خدمة تتيح لأطراف القضية تقديم طلب رفع المنع من السفر عن أحد المدعى عليهم الممنوعين من السفر بالقضية.",
          id: "a1ab9a5d-296e-426d-8fe8-8dc75d294565",
          rank: "firstRank",
        },
        {
          title: "الوكالات ",
          description:
            "هي خدمة تتيح للمستفيدين من معرفة كافة الوكالات الخاصة بهم عن طريق رقم الهوية, ومعرفة حالة الوكالة في أنظمة الوزارة سواء سارية أو غير سارية.",
          id: "28f878ab-eb2d-41bd-885d-10fcd17873de",
          rank: "firstRank",
        },
        {
          title: "تقديم طلب تنفيذ",
          description:
            "خدمة تتيح للمستفيد تقديم طلب تنفيذ السند التنفيذي سواء كان مبلغًا ماليًا أو حكمًا قضائيًا أو قرارًا أو محضرًا في مسائل الأحوال الشخصية (حضانة - زيارة - نفقة)، أو كان محل التنفيذ فعلًا أو امتناعًا عن فعل مثل (إخلاء عقار).",
          id: "1c719954-3463-4754-85e1-1b319b937b86",
          rank: "firstRank",
        },
        {
          title: "تغيير موعد جلسة",
          description:
            "خدمة تتيح لأطراف القضية تقديم طلب تغيير موعد الجلسة القادمة بالقضية مع توضيح الأسباب.",
          id: "80f69ead-b7da-4541-a47c-0b7248c67dc4",
          rank: "firstRank",
        },
        {
          title: "طلب إثبات حضور جلسة",
          description:
            "خدمة تتيح لأطراف القضية الحصول على إثبات حضور جلسة و أكثر .",
          id: "2a02ea71-2118-4c03-89ce-3b63187cb96e",
          rank: "firstRank",
        },
        {
          title: "طلب إصدار فاتورة سداد",
          description:
            "خدمة تتيح للمستفيد المنفذ ضده بطلب إصدار فاتورة السداد للمطالبة حتى يتمكن من استكمال عملية سداد ما عليه من مستحقات مالية على مستوى طلب التنفيذ.",
          id: "724e30f2-a253-4f91-b30b-9afa3eaacd33",
          rank: "firstRank",
        },
        {
          title: "طلب إمهال - تأجيل السند التنفيذي",
          description:
            "خدمة تتيح للمستفيد طالب التنفيذ من إعطاء مهلة للمنفذ ضده بتنفيذ السند ويتم بذلك رفع جميع الأوامر الصادرة بحق المنفذ ضده على مستوى طلب التنفيذ خلال فترة المهلة.",
          id: "a7eef02b-d9ad-4d3f-9ad0-7b9a67399313",
          rank: "firstRank",
        },
        {
          title: "طلب إصدار قرار 34",
          description:
            "خدمة تتيح للمستفيد طالب التنفيذ بطلب إصدار قرار 34 وهو قرار تبليغ المنفذ ضده أنه يتوجب عليه التنفيذ خلال المدة النظامية للتبليغ وفقًا لنظام التنفيذ.",
          id: "001a60e5-eb4e-494e-8c6d-46eb67b300ab",
          rank: "firstRank",
        },
        {
          title: "طلب إصدار قرار رفع 34",
          description:
            "خدمة تتيح للمستفيد المنفذ ضده بالمطالبة برفع إجراءات قرار 34 بعد قيامه بتنفيذ كامل السند التنفيذي.",
          id: "534c12d2-1c11-4f8b-8aa3-4bf5d501a229",
          rank: "firstRank",
        },
        {
          title: "طلب إصدار خطاب حضانة",
          description:
            "خدمة تتيح للمستفيد طالب التنفيذ من طلب إصدار أمر الحضانة لضمان حقه الشرعي المنصوص عليه في السند التنفيذي.",
          id: "739b4d6e-c736-4d27-ba3e-a6d17dd561aa",
          rank: "firstRank",
        },
        {
          title: "طلب تحويل مبلغ محجوز",
          description:
            "خدمة تتيح للمنفذ ضده من طلب تحويل مبلغ محجوز من حساباته البنكية لتسديد المديونية ورفع الإجراءات وإنهاء طلب التنفيذ في حال تم سداد كامل المطالبة.",
          id: "9bc63703-4291-4cc6-9615-ac15a3cfce36",
          rank: "firstRank",
        },
        {
          title: "طلب إدخال",
          description:
            "خدمة تتيح للمدعي أو من يمثله تقديم طلب إدخال طرف في القضية. ",
          id: "6d7b2dff-62e9-4d1e-b125-d6cc7d1cc1eb",
          rank: "firstRank",
        },
        {
          title: "طلب تصحيح الحكم أو تفسيره",
          description:
            "خدمة تتيح لأطراف القضية تقديم طلب تصحيح أو تفسير الحكم وذلك في حالة أن منطوق الحكم غير واضح أو في حالة وجود خطأ حسابي أو خطأ أخر بمنطوق الحكم",
          id: "3f275eb8-cf00-4a70-9e1d-e7aa2256bd75",
          rank: "firstRank",
        },
        {
          title: "طلب إصدار خطاب زيارة",
          description:
            "خدمة تتيح للمستفيد طالب التنفيذ من طلب إصدار خطاب الزيارة لضمان حقه الشرعي المنصوص عليه في السند التنفيذي.",
          id: "d5e26711-4105-4ad9-8cd8-bc6d66242591",
          rank: "firstRank",
        },
        {
          title: "توثيق طلاق",
          description:
            "خدمة تتيح للمستفيد تقديم طلب لإثبات طلاق الزوج لزوجته لدى الجهة المختصة.",
          id: "0205e7ab-9006-4cc5-9c42-cc279e08a831",
          rank: "firstRank",
        },
        {
          title:
            "طلب ترخيص وكيل الممثل النظامي : ترخيص الترافع عن الشخصية المعنوية الخاصة",
          description:
            'خدمة تتيح التقدم للحصول على "ترخيص الترافع عن الشخصية المعنوية الخاصة" للعاملين في الادارات القانونية لدى المنشأت لتمكينهم بالترافع عن المنشأة بعدد لا محدود من القضايا.',
          id: "44ce0459-6f18-44c3-932d-7f6636b62d33",
          rank: "secondRank",
        },
        {
          title: "الإقرار بدين",
          description:
            "خدمة إلكترونية تمكن المستفيد من الإقرار بدين استدانه من شخص أخر.",
          id: "52de3217-7df0-4326-8f1a-8ce294cce7e2",
          rank: "secondRank",
        },
        {
          title: "الإقرار بسداد دين",
          description:
            "خدمة إلكترونية تمكن المستفيد من الإقرار بسداد دين أدانه لشخص أخر.",
          id: "20f22820-099f-49c2-b43d-42db8db0ac86",
          rank: "secondRank",
        },
        {
          title: "تصديق عقد زواج",
          description:
            "خدمة تتيح للمستفيد تقديم طلب توثيق عقد النكاح الصادر من المأذون.",
          id: "6f961e87-0b95-484a-9af7-055aeaf121c0",
          rank: "secondRank",
        },
      ];
    },
  },
};
</script>
<style lang="scss" scoped>
// @media (min-width: 600px) {
//   .field {
//     width: 25% !important;
//     padding: 25px;
//   }
// }
</style>
