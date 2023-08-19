/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-props-no-spreading */
import { useFormik } from "formik";
import * as yup from "yup";
import useSignup from "@/hooks/useSignup";
import useLogin from "@/hooks/useLogin";
import styles from "@/styles/css-modules/LoginSignupPage.module.scss";

function LoginSignupPage({ isLoginMode, handleSwitchMode }) {
  const { handleSignup, isLoading: signupIsLoading } =
    useSignup(handleSwitchMode);
  const { handleLogin, isLoading: loginIsLoading } = useLogin();

  const validationSchema = yup.object().shape({
    name: isLoginMode ? null : yup.string().required("請輸入使用者名稱").trim(),
    email: yup
      .string()
      .email("請輸入有效的電子郵件地址")
      .required("請輸入電子郵件地址")
      .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "電子郵件格式不正確")
      .trim(),
    password: yup
      .string()
      .required("請輸入密碼")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
        "密碼必須包含大小寫字母和數字，且長度至少為八個字符"
      ),
    confirmPassword: isLoginMode
      ? null
      : yup
          .string()
          .required("請再次輸入密碼")
          .oneOf([yup.ref("password")], "密碼不相符")
          .trim(),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // 在提交之前處理 email 字段
      // values.email = values.email.trim();

      if (isLoginMode) {
        // 登入表單
        const loginData = {
          name: values.name,
          password: values.password,
        };
        handleLogin(loginData);
      } else {
        // 註冊表單
        const signupData = {
          name: values.name,
          email: values.email,
          password: values.password,
        };
        handleSignup(signupData, handleSwitchMode);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      {isLoginMode ? (
        <div className={styles.enterBoxForm}>
          <div className={styles.enterItem}>
            <p>使用者名稱</p>
            <input
              type="text"
              placeholder="例: 胡抽抽"
              {...formik.getFieldProps("name")}
            />
            {/* 顯示錯誤訊息 */}
            {formik.touched.name && formik.errors.name ? (
              <div className={styles.error}>{formik.errors.name}</div>
            ) : null}
          </div>
          <div className={styles.enterItem}>
            <p>密碼</p>
            <input type="password" {...formik.getFieldProps("password")} />
            {/* 顯示錯誤訊息 */}
            {formik.touched.password && formik.errors.password ? (
              <div className={styles.error}>{formik.errors.password}</div>
            ) : null}
          </div>
        </div>
      ) : (
        <div className={styles.enterBoxForm}>
          <div className={styles.enterItem}>
            <p>使用者名稱</p>
            <input
              type="text"
              placeholder="例: Chou Chou Hu"
              {...formik.getFieldProps("name")}
            />
            {/* 顯示錯誤訊息 */}
            {formik.touched.name && formik.errors.name ? (
              <div className={styles.error}>{formik.errors.name}</div>
            ) : null}
          </div>
          <div className={styles.enterItem}>
            <p>電子郵件</p>
            <input
              type="text"
              placeholder="例: shirney@appworks.tw"
              // value={email}
              // onChange={(e) => setEmail(e.target.value)}
              {...formik.getFieldProps("email")}
            />
            {/* 顯示錯誤訊息 */}
            {formik.touched.email && formik.errors.email ? (
              <div className={styles.error}>{formik.errors.email}</div>
            ) : null}
          </div>
          <div className={styles.enterItem}>
            <p>密碼</p>
            <input type="password" {...formik.getFieldProps("password")} />
            {/* 顯示錯誤訊息 */}
            {formik.touched.password && formik.errors.password ? (
              <div className={styles.error}>{formik.errors.password}</div>
            ) : null}
          </div>
          <div className={styles.enterItem}>
            <p>再次輸入密碼</p>
            <input
              type="password"
              {...formik.getFieldProps("confirmPassword")}
            />
            {/* 顯示錯誤訊息 */}
            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
              <div className={styles.error}>
                {formik.errors.confirmPassword}
              </div>
            ) : null}
          </div>
        </div>
      )}
      <button
        className={styles.bottomtext}
        type="submit"
        disabled={loginIsLoading || signupIsLoading}
      >
        {loginIsLoading || signupIsLoading
          ? "Loading..."
          : isLoginMode
          ? "登入"
          : "註冊"}
      </button>
    </form>
  );
}

export default LoginSignupPage;
