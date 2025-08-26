import LoginView from "@/components/Auth/LoginView.vue";
import StudentDashboard from "@/components/studentView/StudentDashborad.vue";
import TeacherDashboard from "@/components/teacherView/TeacherDashborad.vue";
import StudentViewBody from "@/components/studentView/StudentViewBody.vue";
import AvailableExamList from "@/components/studentView/AvailableExamList.vue";
import ViewMaterial from "@/components/studentView/ViewMaterial.vue";
import Setting from "@/components/studentView/Setting.vue";
import SettingAccount from "@/components/studentView/SettingAccount.vue";
import SettingSecurity from "@/components/studentView/SettingSecurity.vue";
import TeacherViewBady from "@/components/teacherView/TeacherViewBady.vue";
import ExamManagement from "@/components/teacherView/ExamManagement.vue";
import NewExam from "@/components/teacherView/NewExam.vue";
import StudentResult from "@/components/teacherView/StudentResult.vue";
import EditExam from "@/components/teacherView/EditExam.vue";
import Exam from "@/components/studentView/Exam.vue";
import UnauthorizedPage from "@/components/Auth/UnauthorizedPage.vue";
import Recover from "@/components/teacherView/Recover.vue";
import SettingTeacher from "@/components/teacherView/SettingTeacher.vue";
import SettingAccountTeacher from "@/components/teacherView/SettingAccountTeacher.vue";
import SettingSecurityTeacher from "@/components/teacherView/SettingSecurityTeacher.vue";
import ViewAnswer from "@/components/teacherView/ViewAnswer.vue";
import ViewStudentCompleted from "@/components/teacherView/ViewStudentCompleted.vue";
import Notification from "@/components/studentView/Notification.vue";
import TNotification from "@/components/teacherView/TNotification.vue";
export default [
      {
    path: "/",
    component: LoginView,
    meta: { layout: "auth" },
  },
  {
    path: "/unauthorized",
    name: "unauthorized",
    component: UnauthorizedPage,
  },
  {
    path: "/student-dashboard",
    name: "studentDashboard",
    component: StudentDashboard,
    meta: { layout: "dashboard" },
    children: [
      {
        path: "notification",
        name: "student-notif",
        component: Notification
      },
      {
        path: "",
        name: "studentViewBody",
        component: StudentViewBody,
      },
      {
        path: "available-exam",
        component: AvailableExamList,
      },
      {
        path: "view-materails",
        component: ViewMaterial,
      },
      {
        path: "exam/:id",
        name:"StartExam",
        component: Exam,
      },
      {
        path: "settings",
        component: Setting,
        children: [
          {
            path: "account",
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
  {
    path: "/teacher-dashboard",
    name: "teacherDashboard",
    component: TeacherDashboard,
    meta: { layout: "dashboard" },
    children: [
      {
        path: "",
        name: "teacherbody",
        component: TeacherViewBady,
      },
      {
        path: "ExamManagement",
        name: "ExamManagement",
        component: ExamManagement,
      },
      {
        path: "exam-management/new",
        name: "newExam",
        component: NewExam,
      },
      {
        path: "exam-management/ViewAnswer/:id/:userId",
        name: "viewAnswer",
        component: ViewAnswer,
      },
      {
        path: "exam-management/:id/StudentCompleted",
        name: "StudentCompleted",
        component: ViewStudentCompleted,
      },
      {
        path: "student-results",
        name: "studentResults",
        component: StudentResult,
      },
      {
        path: "notification",
        name: "teacher-notif",
        component: TNotification
      },
      {
        path: "edit/:id",
        name: "editexams",
        component: EditExam,
      },
        {
        path: "recover/:id",
        name: "recoverexams",
        component: Recover,
      },
         {
        path: "setting",
        component: SettingTeacher,
        children: [
          {
            path: "teacher-account",
            component: SettingAccountTeacher,
          },
          {
            path: "security",
            component: SettingSecurityTeacher,
          },

        ],
      },
    ],
  },
]