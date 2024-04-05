export default function NetworkError({ error }: { error: any }) {
  return (
    <div className="max-w-screen-xl mx-auto px-4 flex items-center justify-start h-screen md:px-8">
      <div className="max-w-lg mx-auto space-y-3 text-center">
        <h3 className="text-gray-800 text-4xl font-semibold sm:text-5xl">
          {error}
        </h3>
        <p className="text-gray-600">
          We&apos;re sorry, but we&apos;re unable to connect to the server at
          the moment. This could be due to a variety of reasons, including:
        </p>
        <ul className="items-center text-gray-600">
          <li>Your internet connection may be unstable or offline.</li>
          <li>The server may be experiencing technical difficulties.</li>
          <li>
            There may be a firewall or network restriction blocking the
            connection.
          </li>
        </ul>
        <p className="text-gray-600">
          Please check your internet connection and try again later.
        </p>
        {/* <Link
            href="/"
            className="text-[#7e525f] duration-150 hover:text-[#986673] font-medium inline-flex items-center gap-x-1"
          >
            Return home
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path
                fillRule="evenodd"
                d="M5 10a.75.75 0 01.75-.75h6.638L10.23 7.29a.75.75 0 111.04-1.08l3.5 3.25a.75.75 0 010 1.08l-3.5 3.25a.75.75 0 11-1.04-1.08l2.158-1.96H5.75A.75.75 0 015 10z"
                clipRule="evenodd"
              />
            </svg>
          </Link> */}
      </div>
    </div>
  );
}
