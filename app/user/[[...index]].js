'use client';

import { UserProfile } from '@clerk/nextjs/app-beta'

export default function UserProfilePage() {
    <>
        <UserProfile path="/user" routing="path" />
    </>
}