import AnnouncementCard from "./AnnouncementCard";

function AnnouncementGrid({ announcements }) {

  if (announcements.length === 0) {

    return (

      <div className="py-20 text-center">

        <h2 className="text-2xl font-bold text-gray-700">

          No announcements found

        </h2>

        <p className="mt-3 text-gray-500">

          Try changing your search or category.

        </p>

      </div>

    );

  }

  return (

    <section
      className="
      mt-10
      grid
      grid-cols-1
      sm:grid-cols-2
      xl:grid-cols-3
      gap-6"
    >

      {announcements.map((announcement) => (

        <AnnouncementCard
          key={announcement._id}
          announcement={announcement}
        />

      ))}

    </section>

  );

}

export default AnnouncementGrid;