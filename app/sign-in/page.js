import { SignIn } from '@clerk/nextjs/app-beta';

export default function SignInPage() {
  <>
  <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" />
  </>
}