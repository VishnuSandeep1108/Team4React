import React from 'react';

import styles from "./Magazines.module.css";

function Magazines() {
  return (
    <div className={styles[`magazine-container`]}>
        <h1>MARNI</h1>
        <h1>genith</h1>
        <h1>FRAME</h1>
        <h1>AVAKEN</h1>
        <h1>the Mailgery</h1>
        <h1>Vertrio</h1>
    </div>
  )
}

export default Magazines;
