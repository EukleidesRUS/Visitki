import { FC, useEffect, useState } from "react";
import styles from "./ChatIcon.module.css";

interface IChatIcon {
  count: number | undefined;
}

const ChatIcon: FC<IChatIcon> = ({ count }): JSX.Element => {
  const [isCount, setIsCount] = useState(false);
  useEffect(() => {
    if (count) {
      if (count > 0) {
        setIsCount(true);
      }
    }
  }, [count]);

  return (
    <div className={styles.chatIconContainer}>
      <svg
        className={styles.chatIcon}
        width="26"
        height="27"
        viewBox="0 0 26 27"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M1.51501 25.8868C1.61913 25.9592 1.74257 25.9986 1.86936 26C5.50187 26.0403 8.16451 25.3382 9.84893 23.8091C10.7551 23.9995 11.6981 24.1 12.6667 24.1C19.6623 24.1 25.3333 18.8543 25.3333 12.3834C25.3333 5.91242 19.6623 0.666687 12.6667 0.666687C5.67105 0.666687 0 5.91242 0 12.3834C0 15.3836 1.21909 18.1204 3.22407 20.1932C3.05391 21.8864 2.43272 23.5046 1.36056 25.0475C1.16097 25.3347 1.2278 25.6872 1.51501 25.8868ZM10.4 21.2247C9.61533 21.0598 8.79927 21.2812 8.2056 21.8202C7.53519 22.4288 6.11728 23.2712 4.78757 23.5263C5.41257 22.6216 5.74045 21.3015 5.83579 20.3528C5.90935 19.6208 5.65673 18.8936 5.14521 18.3648C3.55123 16.717 2.66667 14.6172 2.66667 12.3959C2.66667 7.43619 7.10216 3.33335 12.6667 3.33335C18.2312 3.33335 22.6667 7.43619 22.6667 12.3959C22.6667 17.3555 18.2312 21.4584 12.6667 21.4584C11.8951 21.4584 11.1364 21.3794 10.4 21.2247Z"
          fill="#FF00A8"
        />
      </svg>
      {isCount && <p className={styles.chatIconCounter}>{count}</p>}
    </div>
  );
};

export default ChatIcon;
