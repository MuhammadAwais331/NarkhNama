import { useParams } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";
import { getAnnouncement } from "../../services/announcementService";
import { useEffect, useState } from "react";

function AnnouncementDetails() {

    const { announcementId } = useParams();

    const announcement = announcements.find(
        item => item.id === Number(announcementId)
    );

    if (!announcement) {

        return (

            <MainLayout>

                <div className="max-w-7xl mx-auto py-20 px-4">

                    <h1 className="text-3xl font-bold text-red-600">

                        Announcement Not Found

                    </h1>

                </div>

            </MainLayout>

        );

    }

    return (

        <MainLayout>

            <section className="min-h-screen bg-gray-50">

                <div className="max-w-5xl mx-auto px-4 py-10">

                    <h1 className="text-4xl font-bold">

                        {announcement.title}

                    </h1>

                </div>

            </section>

        </MainLayout>

    );

}

export default AnnouncementDetails;