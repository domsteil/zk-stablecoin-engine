import { SignUp } from '@clerk/nextjs/app-beta'

export default function SignUpPage() {
    <>
        <SignUp path="/sign-up" routing="path" signInUrl="/sign-in" />
    </>
}