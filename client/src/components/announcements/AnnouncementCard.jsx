import {
  FaBullhorn,
  FaCalendarAlt,
  FaArrowRight,
} from "react-icons/fa";

function AnnouncementCard({ announcement }) {

  return (

    <article
      className="
      bg-white
      rounded-2xl
      border
      border-gray-200
      p-6
      shadow-sm
      hover:shadow-xl
      transition-all
      duration-300
      hover:-translate-y-1"
    >

      <div className="flex items-center justify-between">

        <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">

          <FaBullhorn className="text-green-700 text-xl" />

        </div>

        <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">

          {announcement.category}

        </span>

      </div>

      <h3 className="mt-5 text-xl font-bold text-gray-800">

        {announcement.title}

      </h3>

      <p className="mt-3 text-gray-600 leading-7">

        {announcement.description}

      </p>

      <div className="mt-6 flex items-center justify-between">

        <span className="flex items-center gap-2 text-sm text-gray-500">

          <FaCalendarAlt />

          {announcement.date}

        </span>

        {/* <button
          className="
          flex
          items-center
          gap-2
          text-green-700
          font-semibold
          hover:gap-3
          transition-all"
        >

          Read More

          <FaArrowRight />

        </button> */}

      </div>

    </article>

  );

}

export default AnnouncementCard;