import Logo from "../Logo";
import { FaReact } from "react-icons/fa";
import { GiBrain } from "react-icons/gi";
import { SiMongodb } from "react-icons/si";
import { SiExpress } from "react-icons/si";
import { FaNodeJs } from "react-icons/fa6";
function Footer() {
  return (
    <section className="relative h-full overflow-hidden bg-gray-400 border border-t-2 border-t-black">
      <div className="w-full pt-6 ">
        <div className="flex flex-col md:flex-row lg:flex-row  h-full items-center justify-evenly">
          <div className="mb-4 inline-flex items-center">
            <Logo width="200px" />
          </div>

          <div>
            <div className=" flex gap-3 items-center text-xl ">
              <div>Made with</div> <GiBrain className="text-red-600 text-3xl" />{" "}
              <div>and</div>
              <SiMongodb className="text-green-600 text-3xl" />
              <SiExpress className="text-yellow-600 text-3xl" />
              <FaReact className="text-blue-600 text-3xl" />
              <FaNodeJs className="text-green-800 text-3xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Footer;
