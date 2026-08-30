import { FaBullhorn, FaCalendarAlt, FaThumbtack } from "react-icons/fa";

function FeaturedAnnouncement({ announcement }) {
  if (!announcement) return null;

  return (
    <section className="mt-10">

      <div className="rounded-3xl bg-gradient-to-r from-green-700 via-green-600 to-emerald-600 p-6 md:p-8 text-white shadow-xl">

        <div className="flex flex-wrap items-center gap-3 mb-5">

          <span className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm font-semibold">

            <FaThumbtack />

            Featured Announcement

          </span>

        </div>

        <h2 className="text-2xl md:text-4xl font-bold">

          {announcement.title}

        </h2>

        <p className="mt-5 text-green-100 leading-8">

          {announcement.description}

        </p>

        <div className="mt-8 flex flex-wrap gap-4">

          <span className="rounded-full bg-white/15 px-4 py-2">

            {announcement.category}

          </span>

          <span className="flex items-center gap-2 rounded-full bg-white/15 px-4 py-2">

            <FaCalendarAlt />

            {announcement.date}

          </span>

        </div>

      </div>

    </section>
  );
}

export default FeaturedAnnouncement;