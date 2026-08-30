import { MdSearch } from "react-icons/md";

function AnnouncementFilters({
  search,
  setSearch,
  category,
  setCategory,
}) {
  return (
    <div className="mt-10 flex flex-col lg:flex-row gap-4">

      <div className="relative flex-1">

        <MdSearch
          className="absolute left-4 top-1/2
          -translate-y-1/2
          text-2xl
          text-gray-400"
        />

        <input
          type="text"
          placeholder="Search announcements..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="w-full rounded-xl border border-gray-300 bg-white py-3 pl-12 pr-4 outline-none focus:ring-2 focus:ring-green-600"
        />

      </div>

      <select
        value={category}
        onChange={(e) =>
          setCategory(e.target.value)
        }
        className="rounded-xl border border-gray-300 bg-white px-5 py-3 outline-none focus:ring-2 focus:ring-green-600"
      >

        <option value="all">

          All Categories

        </option>

        <option value="Price Update">

          Price Update

        </option>

        <option value="Inspection">

          Inspection

        </option>

        <option value="Weather">

          Weather

        </option>

        <option value="Supply Update">

          Supply Update

        </option>

        <option value="Holiday">

          Holiday

        </option>

        <option value="Public Notice">

          Public Notice

        </option>

      </select>

    </div>
  );
}

export default AnnouncementFilters;