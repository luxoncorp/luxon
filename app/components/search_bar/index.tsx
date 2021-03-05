import styles from "./search_bar.module.css";

export default function SearchBar() {
  return (
    <div className={styles.search_bar}>
      <svg
        width="22"
        height="22"
        viewBox="0 0 22 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10.5603 0C5.24158 0 0.901367 4.34021 0.901367 9.65889C0.901367 14.9776 5.24158 19.3178 10.5603 19.3178C12.7406 19.3178 14.7495 18.5804 16.3694 17.3532L22.6078 23.5904C22.7306 23.7182 22.8776 23.8203 23.0404 23.8906C23.2031 23.961 23.3782 23.9981 23.5554 23.9999C23.7327 24.0017 23.9085 23.9682 24.0726 23.9012C24.2367 23.8342 24.3858 23.7351 24.5111 23.6098C24.6365 23.4844 24.7355 23.3353 24.8025 23.1712C24.8695 23.0071 24.9031 22.8313 24.9013 22.654C24.8995 22.4768 24.8623 22.3017 24.792 22.139C24.7217 21.9763 24.6196 21.8292 24.4917 21.7065L18.2546 15.468C19.4818 13.8481 20.2191 11.8392 20.2191 9.65889C20.2191 4.34021 15.8789 0 10.5603 0ZM10.5603 2.66452C14.4389 2.66452 17.5546 5.78023 17.5546 9.65889C17.5546 11.5212 16.8313 13.2031 15.6551 14.4532C15.5406 14.5361 15.4401 14.6367 15.3572 14.7511C14.1068 15.9288 12.4239 16.6533 10.5603 16.6533C6.68159 16.6533 3.56589 13.5376 3.56589 9.65889C3.56589 5.78023 6.68159 2.66452 10.5603 2.66452Z"
          fill="white"
        />
      </svg>
      <input className={styles.search_bar} type="search" />
    </div>
  );
}