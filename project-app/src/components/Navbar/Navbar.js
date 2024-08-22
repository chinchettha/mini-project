import React from 'react';
import Link from 'next/link';
import styles from './navbar.module.css';

const Navbar = () => {
    return (
        <nav className={styles.navbar}>
            <ul className={styles.navList}>
                <li className={styles.navItem}>
                    <Link href="/dashboard" className={styles.navLink}>
                        Dashboard
                    </Link>
                </li>
                <li className={styles.navItem}>
                    <Link href="/new-equipment" className={styles.navLink}>
                        New Equipment
                    </Link>
                </li>
                <li className={styles.navItem}>
                    <Link href="/equipment-list" className={styles.navLink}>
                        Equipment List
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
