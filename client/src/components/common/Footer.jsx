import { Link } from "react-router-dom";

function Footer() {

  return (

    <footer className="bg-green-900 text-green-100">

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">

        <div className="grid gap-8 lg:grid-cols-3">

          {/* Brand */}

          <div className="text-center lg:text-left">

            <h2 className="text-xl font-bold text-white sm:text-2xl">
              Narkh Nama نرخ نامہ
            </h2>

            <p className="mt-2 text-sm text-green-200">
              Digital Market Price Information System
            </p>

          </div>

          {/* Links */}

          <div className="grid grid-cols-2 gap-8 lg:col-span-2">

            {/* Quick Links */}

            <div>

              <h3 className="mb-3 text-base font-semibold text-white">
                Quick Links
              </h3>

              <ul className="space-y-2 text-sm">

                {/* <li>
                  <Link
                    to="/"
                    className="transition hover:text-white"
                  >
                    Home
                  </Link>
                </li>

                <li>
                  <Link
                    to="/#categories"
                    className="transition hover:text-white"
                  >
                    Today's Prices
                  </Link>
                </li>

                <li>
                  <Link
                    to="/#categories"
                    className="transition hover:text-white"
                  >
                    Categories
                  </Link>
                </li> */}

                <li>
                  <Link
                    to="/price-trends"
                    className="transition hover:text-white"
                  >
                    Price Trends
                  </Link>
                </li>

                {/* <li>
                  <Link
                    to="/news"
                    className="transition hover:text-white"
                  >
                    News
                  </Link>
                </li> */}

              </ul>

            </div>

            {/* Legal */}

            <div>

              <h3 className="mb-3 text-base font-semibold text-white">
                Legal
              </h3>

              <ul className="space-y-2 text-sm">

                <li>
                  <Link
                    to="/privacy-policy"
                    className="transition hover:text-white"
                  >
                    Privacy Policy
                  </Link>
                </li>

                <li>
                  <Link
                    to="/terms-and-conditions"
                    className="transition hover:text-white"
                  >
                    Terms & Conditions
                  </Link>
                </li>

              </ul>

            </div>

          </div>

        </div>

        {/* Bottom */}

        <div className="mt-8 border-t border-green-700 pt-5 text-center text-xs text-green-300 sm:text-sm">

          <p>
            © 2026 Government of Khyber Pakhtunkhwa. All Rights Reserved.
          </p>

          <p className="mt-1">
            Version 1.0.0
          </p>

        </div>

      </div>

    </footer>

  );

}

export default Footer;