import Link  from "next/link";
import Image from "next/image";
import HospitalForm from "@/components/forms/HospitalForm";

/*type SearchParamProps = {
  searchParams: {
    admin?: string; // optional, since it might not always be present
  };
};*/

export default function Home() {
  //const isAdmin = searchParams.admin === 'true';
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

            <HospitalForm />

            <div className="text-14-regular mt-10 flex justify-between">
                <p className="justify-items-end text-dark-600 xl:text-left">© 2024 CarePulse</p>
                <Link href="/" className="text-green-500">
                    Patient
                </Link>
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