import { useMemo, useState, useEffect } from "react";

import MainLayout from "../../layouts/MainLayout";
// import ScrollToTop from "../../components/common/ScrollToTop";

import { getAnnouncements } from "../../services/announcementService";

import AnnouncementHero from "../../components/announcements/AnnouncementHero";
import AnnouncementFilters from "../../components/announcements/AnnouncementFilters";
import FeaturedAnnouncement from "../../components/announcements/FeaturedAnnouncement";
import AnnouncementGrid from "../../components/announcements/AnnouncementGrid";
import { useNavigate } from "react-router-dom";

function Announcements() {

    const navigate = useNavigate();
    const [search, setSearch] = useState("");

    const [category, setCategory] = useState("all");

    const [announcements, setAnnouncements] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {

        const fetchAnnouncements = async () => {

            try {

                const data = await getAnnouncements();

                setAnnouncements(data);

            } catch (error) {

                console.error(error);

            } finally {

                setLoading(false);

            }

        };


        fetchAnnouncements();

    }, []);

    const featuredAnnouncement = announcements.find(
        announcement => announcement.featured
    );

    const filteredAnnouncements = useMemo(() => {

        return announcements.filter((announcement) => {

            if (announcement.featured)
                return false;

            const matchesSearch =
                announcement.title
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||

                announcement.description
                    .toLowerCase()
                    .includes(search.toLowerCase());

            const matchesCategory =
                category === "all"
                    ? true
                    : announcement.category === category;

            return matchesSearch && matchesCategory;

        });

    }, [search, category, announcements]);

    if (loading) {

        return (

            <MainLayout>

                <div className="min-h-screen flex items-center justify-center">

                    <h2 className="text-xl font-semibold text-green-700">
                        Loading announcements...
                    </h2>

                </div>

            </MainLayout>

        );

    }

    return (

        <MainLayout>

            {/* <ScrollToTop /> */}

            <section className="min-h-screen bg-gray-50">

                <div className="max-w-7xl mx-auto px-4 py-8 lg:py-10">

                    {/* Hero */}

                    <AnnouncementHero />

                    {/* Search & Filter */}

                    <AnnouncementFilters
                        search={search}
                        setSearch={setSearch}
                        category={category}
                        setCategory={setCategory}
                    />

                    {/* Featured */}

                    <FeaturedAnnouncement
                        announcement={featuredAnnouncement}
                    />

                    {/* Other Announcements */}

                    <AnnouncementGrid
                        announcements={filteredAnnouncements}
                    />

                </div>
                {/* <div className="flex justify-center my-10">

                    <button
                        onClick={() => {
                            if (window.history.length > 1) {
                                navigate(-1);
                            } else {
                                navigate("/", { replace: true });
                            }
                        }}
                        className="bg-green-600 hover:bg-green-700 active:scale-95 transition text-white px-8 py-3 rounded-xl font-semibold"
                    >
                        ← Back to Home
                    </button>

                </div> */}

            </section>

        </MainLayout>

    );

}

export default Announcements;