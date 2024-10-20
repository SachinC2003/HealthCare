import Link from "next/link";
import Image from "next/image";
import PatientInfo from "@/components/forms/PatientInfo";
import { getUser } from "@/app/actions/patient.actions";

type SearchParamProps = {
  params: {
    userId: number;
  };
};

const Info = async ({ params: { userId } }: SearchParamProps) => {
    const user = await getUser(userId.toString()) ?? {
        id: 0,
        name: "Unknown",
        email: "unknown@example.com",
        phone: "N/A",
        createdAt: new Date(),
      };
  
  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container">
        <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
          <Image
            src="/accests/icons/logo.svg"
            height={1000}
            width={1000}
            alt="patient"
            className="mb-12 h-10 w-fit"
          />

          <PatientInfo user={user} />

          <p className="copyright py-12">
            © 2024 CarePulse
          </p>
        </div>
      </section>  
      <Image
        src="/accests/icons/tab-img.png"
        height={1000}
        width={1000}
        alt="patient"
        className="side-img max-w-[390px]"
      />
    </div>
  );
};

export default Info;
