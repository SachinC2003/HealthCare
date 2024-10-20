import LoginForm from "@/components/forms/LoginForm";
import Link  from "next/link";
import Image from "next/image";

type SearchParamProps = {
  searchParams: {
    admin?: string; // optional, since it might not always be present
  };
};

export default function Login({searchParams} : SearchParamProps) {
  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[496px]">
          <Image
              src="/accests/icons/Logo.svg"
              height={1000}
              width={1000}
              alt="patient"
              className="mb-12 h-10 w-fit"
            />

            <LoginForm />

            <div className="text-14-regular mt-20 flex justify-between">
                <p className="justify-items-end text-dark-600 xl:text-left">© 2024 CarePulse</p>
            </div>
        </div>
      </section>
      <Image 
          src="/accests/icons/side-img.png"
          height={1000}
          width={1000}
          alt="patient"
          className="side-img max-w-[50%]"
          />
    </div>
  );
}