import AdminDashborad from "@/components/adminView/AdminDashborad.vue";
import AdminViewBody from "@/components/adminView/AdminViewBody.vue";
import ExamDetailsAndEdit from "@/components/adminView/ExamDetailsAndEdit.vue";
import AdminEditExamPage from "@/components/adminView/AdminEditExamPage.vue";
import TeacherDetail from "@/components/adminView/TeacherDetail.vue";
import UserManagement from "@/components/adminView/UserManagement.vue";
import StudentDetail from "@/components/adminView/StudentDetail.vue";
import AdminDetail from "@/components/adminView/AdminDetail.vue";
import Academic from "@/components/adminView/Academic.vue";
import ActivityLog from "@/components/adminView/ActivityLog.vue";
import PrivateChat from "@/components/adminView/PrivateChat.vue";
import Notification from "@/components/adminView/Notification.vue";
import Settings from "@/components/adminView/Settings.vue";
import SettingAccount from "@/components/adminView/SettingAccount.vue";
import SettingSecurity from "@/components/adminView/SettingSecurity.vue";
import Materil from "@/components/adminView/Materil.vue";
export default [
  {
    path: "/admin-dashboard",
    name: "adminDashboard",
    component: AdminDashborad,
    children: [
      {
        path: "materials",
        name: "materails",
        component: Materil,
      },
      {
        path: "",
        name: "adminBody",
        component: AdminViewBody,
      },
      {
        path: "exam-details/:id",
        name: "ExamDetailsAndEdit",
        component: ExamDetailsAndEdit,
      },
      {
        path: "edit-exam/:id",
        name: "editExam",
        component: AdminEditExamPage,
      },
      {
        path: "user-management",
        name: "userManagement",
        component: UserManagement,
      },
      {
        path: "user-management/student-details/:id",
        name: "studentDetail",
        component: StudentDetail,
      },
      {
        path: "user-management/teacher-details/:id",
        name: "teacherDetail",
        component: TeacherDetail,
      },
      {
        path: "user-management/admin-details/:id",
        name: "adminDetail",
        component: AdminDetail,
      },
      {
        path: "academic",
        name: "academic",
        component: Academic,
      },
      {
        path: "activity-long",
        name: "activityLog",
        component: ActivityLog,
      },
      {
        path: "notification",
        name: "notification",
        component: Notification,
      },
      {
        path: "notification-private-chat",
        name: "privateChat",
        component: PrivateChat,
      },

      {
        path: "settings",
        name: "ad-setting",
        component: Settings,
        children: [
          {
            path: "",
            component: SettingAccount,
          },
          {
            path: "security",
            component: SettingSecurity,
          },
        ],
      },
    ],
  },
];
