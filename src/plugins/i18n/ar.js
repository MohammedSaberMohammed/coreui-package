const ar = {
  welcomeMessage: "مرحباً بك ",
  home: "الرئيسية",
  dashboard: "لوحة المعلومات",
  appointments: "المواعيد",
  appointmentDetails: "تفاصيل الموعد",
  servieDetails: "تفاصيل الخدمة",
  appointmentCard: "بطاقة موعد",
  requestNewAppointment: "حجز موعد جديد",
  instructions: "تعليمات",
  requestAppointmentForensicFacilities: "حجز موعد لزيارة المرافق العدليه",
  appointmentForensicFacilities: "موعد لزيارة المرافق العدليه",
  bookEndorsement: "أتعهد بأني قرأت كافة التعليمات الخاصة لحجز موعد",
  atTime: "الساعة",
  continue: "متابعة",
  cancel: "إلغاء",
  confirm: "تأكيد",
  ok: "تأكيد",
  reset: "اعادة ضبط",
  back: "تراجع",
  moveBack: "الرجوع",
  actions: "الإجراءات",
  warning: "تنبيه",
  bookAppointment: "حجز موعد",
  addToCalendar: "إضافة للتقويم",
  cancelbookAppointment: "الغاء إلغاء الموعد",
  cancelbookAppointmentSuccess: "تم حذف الموعد بنجاح",
  cancelbookAppointmentRequestSuccess: "طلب الموعد غير موجود",
  cancelbookAppointmentNotFound: "الموعد غير موجود",
  cancelbookAppointmentRequestNotFound: "تم حذف طلب الموعد بنجاح",
  cancelbookAppointmentBadRequest: "حدث خطأ بإرسال رقم الهوية",
  requestDetails: "وصف الخدمة المطلوبة",

  underStudying: "تحت الدراسة",
  existing: "قائم",
  rejectionReasons: "اسباب الرفض",

  pending: "تحت الدراسة",
  canceled: "ملغي",
  rejected: "مرفوض",
  active: "قائم",

  congratulations: "تهانينا!",
  successfullyAdded:
    "لقد تم استقبال طلبكم لحجز موعد جديد لزيارة المرافق العدلية سيتم إشعاركم عن طريق رسالة نصية في حال قبول أو رفض طلبكم علماً بأنه سيتم حجز أقرب موعد متاح عند الموافقة على طلبكم",

  confirmNewRequest: "تأكيد حجز الموعد",
  willBookEarlist: "سيتم حجز أقرب موعد متاح",
  confrimRequest: "تأكيد الحجز",

  areYouSureToCancelAppointment: "هل أنت متأكد من إلغاء الموعد؟",
  confirmCancelAppointment: "تأكيد إلغاء الموعد",

  areYouSureToCancelRequest: "هل أنت متأكد من إلغاء الطلب؟",
  confirmCancelRequest: "تأكيد إلغاء الطلب",

  appointmentStatus: "حالة الموعد",
  appointmentCategory: "فئة الموعد",
  service: "الخدمة",
  place: "المكان",
  dateAndTime: "التاريخ والوقت",
  appointmentNumber: "رقم الموعد",
  searchPlaceholder: "البحث",
  filterByStatus: "حالة الموعد",
  gregorian: "ميلادي",
  hijri: "هجري",
  filterWithDate: "تصفية بالتاريخ",

  filterAppointmentsWith: "البحث عن موعد بواسطة ({text})",
  fetchingData: "جاري تحميل البيانات ...",
  noSearchResultsFor: "لا توجد نتائج بحث تطابق ",
  noAppointmentsFound: "لا توجد مواعيد لديك",

  protectAlertHeadTitle: "اشتراط دخول المحصنين للمرافق العدلية",
  protectAlertDescription:
    "حرصاً على سلامتكم، نعتذر عن استقبال أي مستفيد حالته الصحية غير محصن.",

  inputDateRange: "يرجى ادخال فترة زمنية",

  requestNewAppointmentForm: {
    labels: {
      selectRegion: "يرجى تحديد المنطقة",
      selectSite: "اختر مكان الموعد",
      selectDepartment: "اختر القسم أو الدائرة",
      selectService: "اختر الخدمة التي تريد حجز موعد لها",
    },
  },

  appointmentCardDetails: {
    cancelAppointmentTitle: "الغاء الموعد",
    cancelAppointmentText: "هل انت متأكد من الغاء الموعد؟",
    title: "بطاقة موعد",
    id: "رقم الموعد",
    active: "ساري",
    inactive: "غير ساري",
    service: "الخدمة",
    siteName: "المكان",
    socialId: "رقم الهوية",
    fullName: "المستفيد",
  },

  validations: {
    fieldIsRequired: "هذا الحقل مطلوب",
    onlyNumbers: "الرجاء إدخال أرقام فقط",
    maxNumbersLength: "أقصى عدد للمدخلات هو {length}",
    minNumbersLength: "أقل عدد للمدخلات هو {length}",
    numbersExactLength: " عدد الأرقام يجب أن يكون {length}",
    startsWith: " يجب أن يبدأ ب {listText}",
  },

  months: {
    gregorian: {
      january: "يناير",
      february: "فبراير",
      march: "مارس",
      april: "أبريل",
      may: "مايو",
      june: "يونيو ",
      july: "يوليو ",
      august: "أغسطس",
      september: "سبتمبر",
      october: "أكتوبر",
      november: "نوفمبر",
      december: "ديسمبر",
    },
  },

  serverErrors: {
    NOT_FOUND: "لا يمكننا خدمتك في الوقت الحالي.",
    SERVER_ERROR: "حدث خطأ في النظام الرجاء المحاولة لاحقاً",
  },
};

export default ar;
