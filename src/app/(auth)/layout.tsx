import Link from "next/link";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative min-h-full flex flex-col">
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>

      <div className="flex flex-col flex-1">
        <div className="absolute top-0 w-full px-8 mx-auto sm:px-6 lg:px-8 mt-6">
          <nav className="relative flex items-center justify-between sm:h-10">
            <div className="flex items-center flex-grow flex-shrink-0 lg:flex-grow-0">
              <div className="flex items-center justify-between w-full md:w-auto">
                <Link
                  href="/"
                  className="flex items-center gap-2 font-semibold"
                >
                  <svg
                    width="36"
                    height="36"
                    viewBox="0 0 200 200"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {" "}
                    <path
                      d="M32 100.641C32 68.391 54.1651 41.3515 84 34.1102V1.28125C36.3772 8.98855 0 50.5392 0 100.641C0 150.742 36.3772 192.293 84 200V167.171C54.1651 159.93 32 132.89 32 100.641ZM200 100.641C200 150.742 163.623 192.293 116 200V167.171C145.835 159.93 168 132.89 168 100.641C168 68.391 145.835 41.3515 116 34.1102V1.28125C163.623 8.98855 200 50.5392 200 100.641Z"
                      fill="url(#paint0_linear_231_555)"
                    />{" "}
                    <defs>
                      {" "}
                      <linearGradient
                        id="paint0_linear_231_555"
                        x1="157.5"
                        y1="33.0763"
                        x2="44.7421"
                        y2="148.561"
                        gradientUnits="userSpaceOnUse"
                      >
                        {" "}
                        <stop offset="0.0509862" color="#FFB6E1" />{" "}
                        <stop offset="1" color="#FBE3EA" />{" "}
                      </linearGradient>{" "}
                    </defs>{" "}
                  </svg>
                  Logo
                </Link>
              </div>
            </div>
          </nav>
        </div>

        <div className="flex flex-1">
          <main className="flex flex-col items-center flex-1 flex-shrink-0 px-5 pt-16 pb-8 border-r shadow-lg ">
            {children}
          </main>

          <aside className="hidden xl:flex flex-col items-center justify-center flex-1 flex-shrink basis-1/4"></aside>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
