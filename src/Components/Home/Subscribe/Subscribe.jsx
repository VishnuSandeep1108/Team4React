import React from 'react';

import styles from "./Subscribe.module.css";

function Subscribe() {
  return (
    <div className={styles[`subscribe-container`]}>
      <div className={styles[`subscribe-form-container`]}>
        <h3>Subscribe to our Fashion Weekly!</h3>
            <p>Be the first to flash the fashion</p>
            <form className={styles[`subscribe-form`]}>
                <input type='email' placeholder='Email'></input>
                <br /><br />
                <a className={styles[`subscribe-button`]}>
                <span className={styles[`top-border`]}></span>
                <span>Subscribe!</span>
                <span className={styles[`bottom-border`]}></span>
              </a>
            </form>
      </div>
    </div>
  )
}

export default Subscribe;
