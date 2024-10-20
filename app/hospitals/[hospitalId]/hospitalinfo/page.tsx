import Link from "next/link";
import Image from "next/image";
import HospitalInfo from "@/components/forms/HospitalInfo";
import { getHospital } from "@/app/actions/hospital.actions";

type SearchParamProps = {
  params: {
    hospitalId: number;
  };
};


const Info = async ({ params: { hospitalId } }: SearchParamProps) => {
  const hospital = await getHospital(hospitalId.toString()) ?? {
    id: 0,
    hospitalName: "Unknown",  // Make sure this matches the expected type
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
            alt="hospital logo"
            className="mb-12 h-10 w-fit"
          />

          <HospitalInfo hospital={hospital} />

          <p className="copyright py-12">
            © 2024 CarePulse
          </p>
        </div>
      </section>  
      <Image
        src="/accests/icons/tab-img.png"
        height={1000}
        width={1000}
        alt="hospital image"
        className="side-img max-w-[390px]"
      />
    </div>
  );
};

export default Info;
