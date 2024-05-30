"use client"
import Link from "next/link";

export default function Admin() {
    return (
        <span>
            <Link href="admin/boardgames">Board Games</Link>|
            <Link href="admin/mechanics">Mechanics</Link>|
        </span>
    );
}