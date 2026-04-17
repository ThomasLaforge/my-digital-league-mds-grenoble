import styles from "./auth.module.scss";

const AuthLayout = ({
  children
}: {
  children: React.ReactNode
}) => {
  return (
    <div className={styles.authContainer}>
      {children}
    </div>
   );
}

export default AuthLayout;
