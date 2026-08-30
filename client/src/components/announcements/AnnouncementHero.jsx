import { useEffect, useState } from "react";
import api from "../../services/api";

function AnnouncementHero() {

  const [lastUpdated, setLastUpdated] = useState("");

  useEffect(() => {

    const fetchSettings = async () => {

      try {

        const { data } = await api.get("/settings");
        if (data.lastUpdated) {
          setLastUpdated(
            new Date(data.lastUpdated).toLocaleDateString()
          );
        }


      } catch (error) {

        console.log(error);

      }

    };

    fetchSettings();

  }, []);

  return (
    <section className="rounded-3xl bg-gradient-to-r from-green-700 via-green-600 to-emerald-600 text-white px-6 py-10 md:px-10 md:py-14 shadow-xl">

      <div className="max-w-3xl">

        <span className="inline-block rounded-full bg-white/20 px-4 py-1 text-sm font-medium">

          Government Updates

        </span>

        <h1 className="mt-5 text-3xl md:text-5xl font-bold">

          Market Announcements

        </h1>

        <p className="mt-5 text-green-100 text-base md:text-lg leading-8">

          Stay informed with the latest government notifications,
          official price updates, market inspections, weather
          advisories and important public notices.

        </p>

        <div className="mt-8 flex flex-wrap gap-4">

          <div className="rounded-xl bg-white/15 px-5 py-3 backdrop-blur">

            <p className="text-sm text-green-100">

              Last Updated

            </p>

            <p className="font-semibold">

              {lastUpdated || "Loading..."}

            </p>

          </div>

          <div className="rounded-xl bg-white/15 px-5 py-3 backdrop-blur">

            <p className="text-sm text-green-100">

              Official Source

            </p>

            <p className="font-semibold">

              District Administration

            </p>

          </div>

        </div>

      </div>

    </section>
  );
}

export default AnnouncementHero;