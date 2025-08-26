<!-- components/ActionIcon.vue -->
<template>
  <div
    :class="[
      'flex-shrink-0 h-9 w-9 rounded-full p-1.5 flex items-center justify-center',
      iconMap[normalizedType]?.bg || 'bg-gray-300',
    ]"
  >
    <component
      :is="iconMap[normalizedType]?.icon || DefaultIcon"
      class="w-5 h-5 text-white"
    />
  </div>
</template>
<script>
import {
  CheckCircle,
  User,
  Trash,
  Pencil,
  XCircle,
  FileText,
  MessageCircle,
  CalendarDays,
  UploadCloud,
  Download,
  BookOpen,
  ShieldCheck,
  Clock,
  Smartphone,
  MonitorSmartphone,
  Apple,
  Laptop,
  Globe,
} from "lucide-vue-next";
const iconMap = {
  login: { icon: User, bg: "bg-emerald-500" },
  submit: { icon: CheckCircle, bg: "bg-indigo-500" },
  delete: { icon: Trash, bg: "bg-rose-500" },
  update: { icon: Pencil, bg: "bg-amber-500" },
  ended_exam: { icon: XCircle, bg: "bg-red-600" },
  assignment: { icon: FileText, bg: "bg-yellow-500" },
  message: { icon: MessageCircle, bg: "bg-blue-400" },
  exam_scheduled: { icon: CalendarDays, bg: "bg-sky-600" },
  upload: { icon: UploadCloud, bg: "bg-cyan-500" },
  download: { icon: Download, bg: "bg-violet-500" },
  material: { icon: BookOpen, bg: "bg-orange-500" },
  permission: { icon: ShieldCheck, bg: "bg-lime-600" },
  timeout: { icon: Clock, bg: "bg-gray-500" },
  android: { icon: Smartphone, bg: "bg-green-500" },
  iphone: { icon: Apple, bg: "bg-neutral-800" },
  mac: { icon: Laptop, bg: "bg-gray-700" },
  windows: { icon: MonitorSmartphone, bg: "bg-blue-600" },
  browser: { icon: Globe, bg: "bg-indigo-500" },
    // ✅ NEW TYPE FOR ADMIN PASSWORD CHANGE
  password_change: { icon: ShieldCheck, bg: "bg-fuchsia-600" },
};

export default {
  props: {
    type: { type: String, default: "" },
  },
  computed: {
    normalizedType() {
      return this.type?.toLowerCase();
    },
  },
  components: {
    Smartphone,
    MonitorSmartphone,
    Apple,
    Laptop,
    Globe,
    CheckCircle,
    User,
    Trash,
    Pencil,
    XCircle, // register XCircle component
    DefaultIcon: User,
  },
  data() {
    return {
      iconMap,
    };
  },
};
</script>
